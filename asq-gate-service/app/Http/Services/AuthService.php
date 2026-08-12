<?php

namespace App\Http\Services;

use Illuminate\Http\Request;

class AuthService extends BaseService
{
    protected const ASQ_AUTH_BASE_URL = "http://asq-nginx/auth";

    public function __construct (
        # insert your Dependency Injections here
    ){
        parent::__construct();
    }

    public function login (array $credentials): mixed 
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_BASE_URL . "/login",
                'headers' => [],
                'options' => $credentials
            ]
        ]);
    }

    public function logout (Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_BASE_URL . "/logout",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function refresh (Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_BASE_URL . "/refresh",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function me (Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_BASE_URL . "/me",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

}