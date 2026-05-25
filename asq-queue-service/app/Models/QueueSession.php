<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class QueueSession extends Model
{
    use SoftDeletes;
    //
    protected $table = 'queue_session';

    protected $fillable = [
        'session_type',
        'created_by', 
        'department_id',
        'window_id',
        'company_id',
        'date',
        'start_time',
        'end_time',
        'last_queue_number',
    ];

    public function scopeFilter(Builder $query, Request $request): Builder
    {
        return $query
            ->when($request->session_type, function ($q) use ($request) {
                $q->where('session_type', $request->session_type);
            })
            ->when($request->date, function ($q) use ($request) {
                $q->whereDate('date', $request->date);
            });
    }
}
