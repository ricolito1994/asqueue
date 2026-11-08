<?php
namespace App\Http\Services;

use Illuminate\Http\Request;

class OneQueueService extends BaseService
{
    public const ONE_QUEUE_SERVICE_URL = "http://asq-nginx/onequeue";

    public function __construct(
        # Dependency Injection here
    ){
        parent::__construct();
    }

    public function index(Request $request): array
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ONE_QUEUE_SERVICE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }
}