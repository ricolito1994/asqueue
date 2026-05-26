<?php
namespace App\Http\Services;

use Illuminate\Http\Request;

class QueueManagerService extends BaseService 
{
    const QUEUE_MANAGER_SERVICE_Q_SESH_URL = "http://nginx/api/queue/session";

    const QUEUE_MANAGER_SERVICE_W_URL = "http://nginx/api/queue/windows";

    const NOTIF_MANAGER_SERVICE_URL = "http://nginx/api/notif";

    public function createQueueSession (Request $request)
    {
        return $this->asyncRequest([
            [
                'method' => 'POST',
                'url' => self::QUEUE_MANAGER_SERVICE_Q_SESH_URL . "",
                'headers' => [
                ],
                'options' => ($request->all())
            ],
            [
                'method' => 'POST',
                'url' => self::NOTIF_MANAGER_SERVICE_URL . "/user/active",
                'headers' => [
                ],
                'options' => ($request->all())
            ]
        ]);
    }

    public function updateQueueSession (Request $request, int $sessionID)
    {
        return $this->asyncRequest([
            [
                'method' => 'PATCH',
                'url' => self::QUEUE_MANAGER_SERVICE_Q_SESH_URL . "/{$sessionID}",
                'headers' => [
                    'Authorization' => "Bearer {$request->bearerToken()}"
                ],
                'options' => ($request->all())
            ],
            [
                'method' => 'POST',
                'url' => self::NOTIF_MANAGER_SERVICE_URL . "/user/active",
                'headers' => [
                ],
                'options' => ($request->all())
            ]
        ]);
    }

    public function windowAssignedTo (Request $request, int $userid)
    {
        return $this->asyncRequest([
            [
                'method' => 'GET',
                'url' => self::QUEUE_MANAGER_SERVICE_W_URL . "/assignedto/{$userid}",
                'headers' => [
                ],
                'options' => ($request->all())
            ]
        ]);
    }
}