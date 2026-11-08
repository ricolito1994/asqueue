<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class College extends Model
{
    protected $table = 'colleges';

    protected $fillable = [
        'college',
        'company_id'
    ];
}
