<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentService extends BaseService 
{
    protected const ASQ_ONE_QUEUE_SERVICE = "http://asq-nginx/onequeue";

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
                'url' => self::ASQ_ONE_QUEUE_SERVICE . '/student',
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}",
                    'Accept'        => 'application/json',
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function create(Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_ONE_QUEUE_SERVICE . '/student',
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}",
                    'Accept'        => 'application/json',
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function createConfirm(Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_ONE_QUEUE_SERVICE . '/student/create-confirm',
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}",
                    'Accept'        => 'application/json',
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function findStudent(Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_ONE_QUEUE_SERVICE . '/student/find-student',
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}",
                    'Accept'        => 'application/json',
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function findByEnrollmentNumber(Request $request): mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_ONE_QUEUE_SERVICE . '/student/find-by-enrollment-number',
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}",
                    'Accept'        => 'application/json',
                ],
                'options' => $request->all()
            ]
        ]);
    }
}