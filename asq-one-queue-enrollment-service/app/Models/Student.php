<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use SoftDeletes;
    
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
        'is_transfer_student',
        'is_enrollment_withrawn',
        'withraw_reason',
    ];

    protected $casts = [
        'expires_at' => 'date:Y-m-d',
        'is_transfer_student'  => 'boolean',
        'is_enrollment_withrawn' => 'boolean',
    ];
}
