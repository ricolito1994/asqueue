<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;
    
    protected $table = 'courses';

    protected $fillable = [
        'course',
        'course_code',
        'company_id',
        'department_id',
    ];
}
