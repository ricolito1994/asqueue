<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class YearLevel extends Model
{
    protected $table = 'year_level';

    protected $fillable = [
        'year_level',
        'course_id',
        'description',
    ];
}
