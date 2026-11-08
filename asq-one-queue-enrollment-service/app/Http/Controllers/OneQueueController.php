<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

class OneQueueController extends Controller
{
    //
    public function __construct(){}

    public function index (Request $request): JsonResponse|Response
    {
        try {
            return response()->json([
                'message' => "fuck"
            ]);
        } catch (Throwable $e) {
            return $this->processException($e);
        }
    }
}
