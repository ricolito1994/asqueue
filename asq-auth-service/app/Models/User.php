<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Str;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'password',
        'email',
        'username',
        'designation',
        'title',
        'window_id',
        'company_id',
        'department_id'
    ];

    protected $appends = ['full_name'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function company (): BelongsTo 
    {
        return $this->belongsTo(Company::class);
    }

    public function department(): BelongsTo 
    {
        return $this->belongsTo(Department::class);
    }

    public function refreshTokens(): HasMany 
    {
        return $this->hasMany(RefreshToken::class);
    }

    public function scopeFilter(Builder $query, array $filters = []): Builder
    {
        return $query
            ->when(isset($filters['company_id']), function($q) use ($filters) {
                $q->where('company_id', $filters['company_id']);
            })
            ->when(isset($filters['department_id']), function ($q) use ($filters) {
                $q->where('department_id', $filters['department_id']);
            })
            ->when(isset($filters['full_name']), function($q) use ($filters) {
                $q->whereRaw("CONCAT(firstname, ' ', lastname) LIKE ?", ["%{$filters['full_name']}%"]);
            });
    }

    public function createRefreshToken () 
    {
        try {
            $simpleToken = Str::random(60);

            $maxAllowableRefreshTokens = 5;

            # delete expired refresh tokens
            $this->refreshTokens()->where('expires_at', '<', now())->delete();

            $refreshTokens = $this->refreshTokens();

            if ($refreshTokens->count() >= $maxAllowableRefreshTokens) {
               $refreshTokens->oldest()->limit(1)?->delete(); 
            }

            RefreshToken::create([
                'user_id' => $this->id,
                'token' => $simpleToken = hash('sha256', $simpleToken),
                'expires_at' => now()->addDays(30), 
            ]);

            return $simpleToken;

        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function fullName (): Attribute
    {
        return Attribute::make (
            get: fn () => "{$this->firstname} {$this->lastname}"
        );
    }

    public function getJWTIdentifier () 
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims() 
    {
        return [];
    }
}
