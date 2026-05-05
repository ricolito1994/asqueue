<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Transaction extends Model
{
    use SoftDeletes;
    //
    protected $table = 'transactions';

    protected $fillable = [
        'description',
        'status', 
        'queue_number',
        'processed_by',
        'created_by',
        'company_id',
        'department_id',
        'queue_session_id',
        'window_id',
        'concern_id',
        'pre_process_log',
        'post_process_log',
        'process_start_at',
        'process_end_at',
        'is_priority',
    ];

    protected $appends = ['process_time'];

    protected function casts(): array
    {
        return [
            'is_priority' => 'boolean',
            'process_end_at' => 'datetime',
            'process_start_at' => 'datetime'
        ];
    }

    public function window (): HasOne 
    {
        return $this->hasOne(Window::class, 'id', 'window_id');
    }

    public function concern (): HasOne 
    {
        return $this->hasOne(Concern::class, 'id', 'concern_id');
    }

    public function scopeFilterByIds (Builder $query, array $conditions): Builder
    {
        return $query
            ->when(isset($conditions['company_id']), function (Builder $q) use ($conditions){
                $q->where('company_id', $conditions['company_id']);
            })
            ->when(isset($conditions['department_id']), function (Builder $q) use ($conditions){
                $q->where('department_id', $conditions['department_id']);
            });
    }

    public function scopeWindow (Builder $query, ?int $window_id)
    {
        return $query
            ->when(isset($window_id), function (Builder $q) use ($window_id){
                $q->where('window_id', $window_id);
            });
    }

    public function scopeIsPriority(Builder $query, ?bool $is_priority): Builder
    {
        return $query
            ->when(isset($is_priority), function (Builder $q) use ($is_priority){
                $q->where('is_priority', $is_priority);
            });
    }

    public function scopeIsDone (Builder $query, ?bool $isDone = null): Builder
    {
        return $query
            ->when(isset($isDone), function (Builder $q) use ($isDone){
                $q->whereNotNull('process_end_at');
            });
        
    }

    public function scopeStatus (Builder $query, ?string $status = null, ?bool $isDone = null): Builder
    {
        if (isset($status) || isset($isDone)) {
            if ($status === 'all' || $isDone) return $query;
        } 
        return $query->where('status', 'queue');
    }

    public function scopeCreatedDate(Builder $query,  mixed $date = null): Builder
    {
        # return $query->whereDate('created_at',  $date ?? Carbon::now());
        return $query->when(isset($date), function (Builder $q) use ($date) {
            $query->whereDate('created_at',  $date);
        });
    }

    public function scopeDateBetweenCreated(Builder $query, array $dates)
    {
        $from = isset ($dates['from_date']) ? $dates['from_date'] . " 00:00:00" : null;
        $to   = isset ($dates['to_date']) ? $dates['to_date'] . " 23:59:59" : null;

        return $query->when($from && $to, function ($q) use ($from, $to) {
                $q->whereBetween('created_at', [$from, $to]);
            })
            ->when($from && !$to, function ($q) use ($from) {
                $q->where('created_at', '>=', $from);
            })
            ->when($to && !$from, function ($q) use ($to) {
                $q->where('created_at', '<=', $to);
            });
    }

    protected function processTime(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->process_start_at && $this->process_end_at
                ? Carbon::parse($this->process_start_at)
                    ->diff(Carbon::parse($this->process_end_at))
                    ->format('%H:%I:%S')
                : "pending"
        );
    }

}
