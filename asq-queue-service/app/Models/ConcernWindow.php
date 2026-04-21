<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConcernWindow extends Model
{
    use SoftDeletes;
    // pivot table

    protected $table = 'concern_window';

    protected $fillable = [
        'window_id',
        'concern_id',
        'start_date',
        'end_date',
    ];
}
