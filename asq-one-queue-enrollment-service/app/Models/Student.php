<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = 'student';

    protected $fillable = [
        'firstname',
        'lastname',
        'middlename',
        'student_enrollment_number',
        'course_id',
        'school_year',
        'expires_at',
        'current_step',
        'current_step_id',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'date'
    ];
}
