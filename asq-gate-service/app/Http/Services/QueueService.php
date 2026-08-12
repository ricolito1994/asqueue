<?php
namespace App\Http\Services;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class QueueService extends BaseService
{
    protected const ASQ_W_QUEUE_BASE_URL = "http://asq-nginx/queue/windows";

    protected const ASQ_T_QUEUE_BASE_URL = "http://asq-nginx/queue/transaction";

    protected const ASQ_S_QUEUE_BASE_URL = "http://asq-nginx/queue/session";

    protected const ASQ_C_QUEUE_BASE_URL = "http://asq-nginx/queue/concerns";

    public function __construct(
        # Dependency Injection here
    )
    {
        parent::__construct();
    }

    public function transactionIndex(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_T_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function transactionCreate(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_T_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function transactionProcessQueueNumber(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_T_QUEUE_BASE_URL . "/process",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function transactionRecallQueueNumber(Request $request, int $queueNumber):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_T_QUEUE_BASE_URL . "/recall/{$queueNumber}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function concernIndex(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_C_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function windowIndex(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_W_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function windowAssignedTo(Request $request, int $userId):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_W_QUEUE_BASE_URL . "/assignedto/{$userId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function sessionCreate(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::ASQ_S_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function sessionIndex(Request $request):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::ASQ_S_QUEUE_BASE_URL . "",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

    public function sessionPatch(Request $request, int $sessionId):mixed
    {
        return $this->asyncRequest([
            [
                'method' => 'PATCH',
                'url' => self::ASQ_S_QUEUE_BASE_URL . "/{$sessionId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => $request->all()
            ]
        ]);
    }

}