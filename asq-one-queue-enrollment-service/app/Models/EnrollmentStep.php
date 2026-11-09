<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EnrollmentStep extends Model
{
    use SoftDeletes;
    
    protected $table = 'enrollment_steps';

    protected $fillable = [
        'step',
        'description',
        'long_description',
        'course_id',
        'year_level',
        'school_year',
        'school_year_id',
        'department_id',
        'is_also_for_transfer_students',
        'specific_window_id',
    ];

    protected $casts = [
        'step'                          => 'integer',
        'course_id'                     => 'integer',
        'year_level_id'                 => 'integer',
        'school_year_id'                => 'integer',
        'department_id'                 => 'integer',
        'specific_window_id'            => 'integer',
        'is_also_for_transfer_students' => 'boolean'
    ];
}
