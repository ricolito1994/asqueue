<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Window extends Model
{
    use SoftDeletes;
    //
    protected $table = 'windows';

    protected $fillable = [
        'name',
        'description', 
        'company_id',
        'department_id',
        'assigned_to',
        'logo'
    ];

    public function transactions(): HasMany 
    {
        return $this->hasMany(Transaction::class);
    }

    public function concerns (): BelongsToMany
    {
        return $this->belongsToMany(Concern::class, 'concern_window')
            ->withPivot([
                'start_date', 
                'end_date',
            ]);
    }

    public function scopeFilter(Builder $query, Request $request): Builder 
    {
        // formulate query filter logic here
        return $query
            ->when($request->company_id, function (Builder $q) use ($request) {
                $q->where('company_id', $request->company_id);
            })
            ->when($request->department_id, function (Builder $q) use ($request) {
                $q->where('department_id', $request->department_id);
            })
            ->when($request->concern_id, function (Builder $q) use ($request) {
                $q->whereHas('concerns', function ($q2) use ($request) {
                    $q2->where('concerns.id', $request->concern_id);
                });
            });
    }


}
