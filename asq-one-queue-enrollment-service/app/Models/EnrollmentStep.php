<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentStep extends Model
{
    protected $table = 'enrollment_steps';

    protected $fillable = [
        'step',
        'description',
        'course_id',
        'year_level',
        'school_year',
        'school_year_id',
        'department_id'
    ];
}
