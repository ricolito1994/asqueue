<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentTransaction extends Model
{
    protected $table = 'enrollment_transactions';

    protected $fillable = [
        'student_id',
        'step',
        'step_id',
        'school_year',
        'transaction_start_at',
        'transaction_end_at',
        'description'
    ];

    protected $casts = [
        'transaction_start_at' => 'datetime',
        'transaction_end_at'   => 'datetime'
    ];
}
