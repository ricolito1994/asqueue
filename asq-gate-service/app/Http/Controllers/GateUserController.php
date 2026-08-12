<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Services\UserService;

class GateUserController extends Controller
{
    //
    public function __construct(
        protected readonly UserService $userService
    ){}

    public function index(): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->userService->index($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }
    
    public function create(): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->userService->index($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function update(Request $request, int $userId): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->userService->index($request, $userId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function find(Request $request, int $userId): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->userService->find($request, $userId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function delete(Request $request, int $userId): JsonResponse|Response
    {
        try {
            $request = $request->all();
            $res = $this->userService->delete($request, $userId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function setActiveSession(Request $request, int $userId): JsonResponse|Response
    {
        try {
            $res = $this->userService->setActiveSession($request, $userId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function departmentFind (Request $request, int $deptId): JsonResponse|Response
    {
        try {
            $res = $this->userService->departmentFind($request, $deptId);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
            return $this->processException($e);
        }
    }

}
