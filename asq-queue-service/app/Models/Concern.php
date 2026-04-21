<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

class Concern extends Model
{
    use SoftDeletes;
    //
    protected $table = 'concerns';

    protected $fillable = [
        'name',
        'description', 
        'company_id',
        'department_id',
        'logo'
    ];

    public function scopeFilter(Builder $query, Request $request): Builder 
    {
        // formulate query filter logic here
        return $query
            ->when($request->company_id, function (Builder $q) use ($request) {
                $q->where('company_id', $request->company_id);
            })
            ->when($request->department_id, function (Builder $q) use ($request) {
                $q->where('department_id', $request->department_id);
            });
    }

    public function windows (): BelongsToMany
    {
        return $this->belongsToMany(Window::class, 'concern_window')
            ->withPivot([
                'start_date', 
                'end_date',
            ]);
    }
}
