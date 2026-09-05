<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Department extends Model
{
    //
    protected $table = 'department';

    protected $fillable = [
        'name',
        'company_id'
    ];

    public function scopeFilter(Builder $q, Request $request): Builder
    {
        return (
            $q->when(
                $request->has('company_id'), function (Builder $q) use ($request) {
                    $q->where('company_id', $request->company_id);
                }
            )
        );
    }

    public function company (): BelongsTo 
    {
        return $this->belongsTo(Company::class);
    }
}
