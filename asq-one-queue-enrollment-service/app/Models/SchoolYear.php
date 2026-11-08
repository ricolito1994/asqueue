<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolYear extends Model
{
    protected $table = 'school_year';

    protected $fillable = [
        'school_year_from',
        'school_year_to',
        'enrolment_start_date',
        'enrolment_end_at',
        'school_year_start_at',
        'school_year_end_at',
        'company_id',
    ];

    protected $casts = [
        'enrolment_start_date' => 'date',
        'enrolment_end_at'     => 'date',
        'school_year_start_at'  => 'date',
        'school_year_end_at'    => 'date',
    ];
}
