<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    //
    protected $table = 'company';

    protected $fillable = [
        'name',
        'logo'
    ];

    public function departments (): HasMany 
    {
        return $this->belongsToMany (Department::class);
    }

}
