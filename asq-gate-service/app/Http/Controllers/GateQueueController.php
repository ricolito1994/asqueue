<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Services\QueueService;

class GateQueueController extends Controller
{
    //
    public function __construct(
        # Dependency Injection here
        protected readonly QueueService $queueService
    ){}

    public function transactionIndex(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->transactionIndex($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function transactionCreate(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->transactionCreate($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function transactionProcessQueueNumber(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->transactionProcessQueueNumber($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function transactionRecallQueueNumber(Request $request, int $queueNumber): Response|JsonResponse
    {
        try {
            $res = $this->queueService->transactionRecallQueueNumber($request, $queueNumber);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function windowAssignedTo(Request $request, int $userId): Response|JsonResponse
    {
        try {
            $res = $this->queueService->windowAssignedTo($request, $userId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function windowIndex(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->windowIndex($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function sessionCreate(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->sessionCreate($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function sessionIndex(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->sessionIndex($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function sessionPatch(Request $request, int $sessionId): Response|JsonResponse
    {
        try {
            $res = $this->queueService->sessionIndex($request, $sessionId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

    public function concernIndex(Request $request): Response|JsonResponse
    {
        try {
            $res = $this->queueService->concernIndex($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }
}
