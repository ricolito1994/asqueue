<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        'date',
        'start_time',
        'end_time',
        'last_queue_number',
    ];
}
