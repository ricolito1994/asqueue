<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserService extends BaseService {

    protected const ASQ_AUTH_USER_BASE_URL = "http://asq-nginx/auth/user";

    protected const ASQ_AUTH_DEPT_BASE_URL = "http://asq-nginx/auth/department";

    public function __construct (
        # insert your Dependency Injections here
    ){
        parent::__construct();
    }

    public function index(Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function create(): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function update(Request $request, int $userId): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'PATCH',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "/{$userId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function find(Request $request, int $userId): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "/{$userId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function delete(Request $request, int $userId): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'DELETE',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "/{$userId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function setActiveSession(Request $request, int $userId): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_AUTH_USER_BASE_URL . "/set-active-session/{$userId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function departmentFind(Request $request, int $deptId): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_AUTH_DEPT_BASE_URL . "/{$deptId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }
}