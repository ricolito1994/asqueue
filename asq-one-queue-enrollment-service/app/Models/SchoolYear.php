<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SchoolYear extends Model
{
    use SoftDeletes;

    protected $table = 'school_year';

    protected $fillable = [
        'school_year_from',
        'school_year_to',
        'school_year_start_at',
        'school_year_end_at',
        'company_id',
    ];

    protected $casts = [
        'school_year_start_at'  => 'date:Y-m-d',
        'school_year_end_at'    => 'date:Y-m-d',
    ];
}
