<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GateAuthController extends Controller
{
    public function __construct (
        protected readonly AuthService $authService
    ) {}

    public function login (Request $request): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->authService->login($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function logout (Request $request): JsonResponse|Response
    {
        try {
            $res = $this->authService->logout($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function refresh (Request $request): JsonResponse|Response
    {
        try {
            $res = $this->authService->refresh($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function me (Request $request): JsonResponse|Response
    {
        try {
            $res = $this->authService->me($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

}
