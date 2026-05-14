<?php

namespace App\Http\Services;

use Illuminate\Http\Request;

class NotifService extends BaseService 
{
    const QUEUE_NOTIF_MICROSERVICE_URL = 'http://nginx/api/notif/queue';

    const QUEUE_NOTIF_MICROSERVICE_URL_UNGROUPED = 'http://nginx/api/notif';
 

    public function processNextQueueNumber (Request $request): array
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::QUEUE_NOTIF_MICROSERVICE_URL . "/process",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => ($request->all())
            ]
        ]);
    }

    public function recallQueueNumber (Request $request, int $queueNumber): array
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::QUEUE_NOTIF_MICROSERVICE_URL . "/recall/{$queueNumber}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => ($request->all())
            ]
        ]);
    }

    public function updateQueList (Request $request, int $windowId, int $companyId): array
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::QUEUE_NOTIF_MICROSERVICE_URL_UNGROUPED . "/update-queue-list/{$windowId}/company/{$companyId}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => ($request->all())
            ]
        ]);
    }

}