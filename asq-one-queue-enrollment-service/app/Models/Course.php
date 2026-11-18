<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    use SoftDeletes;
    
    protected $table = 'courses';

    protected $fillable = [
        'course',
        'course_code',
        'company_id',
        'college_id',
    ];

    public function college(): BelongsTo
    {
        return $this->belongsTo(College::class);
    }
}
