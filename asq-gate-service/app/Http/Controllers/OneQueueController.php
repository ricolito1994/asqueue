<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Services\OneQueueService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

class OneQueueController extends Controller
{
    public function __construct(
        protected readonly OneQueueService $oneQueueService
    ){}

    public function index (Request $request): JsonResponse|Response
    {
        try {
            $res = $this->oneQueueService->index($request);
            return response()->json($res);
        } catch (Exception $e) {
            return $this->processException($e);
        }
    }
}
