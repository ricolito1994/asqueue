<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class College extends Model
{
    use SoftDeletes;
    
    protected $table = 'colleges';

    protected $fillable = [
        'college_name',
        'company_id'
    ];
}
