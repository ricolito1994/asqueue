<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class College extends Model
{
    use SoftDeletes;
    
    protected $table = 'colleges';

    protected $fillable = [
        'college_code',
        'college_name',
        'company_id'
    ];

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
