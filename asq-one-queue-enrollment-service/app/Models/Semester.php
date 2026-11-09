<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Semester extends Model
{
    use SoftDeletes;

    protected $table = 'semester';

    protected $fillable = [
        'semester',
        'school_year_id',
        'school_year',
        'enrollment_start_at',
        'enrollment_end_at',
        'semester_start_at',
        'semester_end_at',
    ];

    protected $casts = [
        'semester'             => 'integer',
        'enrollment_start_at'  => 'date:Y-m-d',
        'enrollment_end_at'    => 'date:Y-m-d',
        'semester_start_at'    => 'date:Y-m-d',
        'semester_end_at'      => 'date:Y-m-d',
    ];
}
