<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UpdateQueueNumberEvent;
use App\Events\RecallQueueNumberEvent;
use App\Events\UpdateQueueListEvent;
use Illuminate\Http\JsonResponse;
use App\Events\EventClient;

class NotificationsController extends Controller
{
    //
    public function processNextQueueNumber (Request $request): JsonResponse
    {
        try {
            broadcast(new UpdateQueueNumberEvent(params: $request->all()));

            return response ()
                ->json ([
                    'success' => true,
                    'message' => 'Notification sent!'
                ],200);
        } catch (\Exception $e) {
             return response ()
                ->json ([
                    'success' => false,
                    'message' => 'Something went wrong.',
                    'reason' => $e->getMessage()
                ],500);
        }
    }

    public function recallQueueNumberEvent (Request $request, int $queueNumber): JsonResponse
    {
        try {
            broadcast(new RecallQueueNumberEvent(params: $request->all()));

            return response ()
                ->json ([
                    'success' => true,
                    'message' => 'Notification sent!'
                ],200);
        } catch (\Exception $e) {
             return response ()
                ->json ([
                    'success' => false,
                    'message' => 'Something went wrong.',
                    'reason' => $e->getMessage()
                ],500);
        }
    }

    public function updateQueueList (Request $request, int $windowId): JsonResponse
    {
        try {

        } catch (\Exception $e) {
            
        }
    }
}
