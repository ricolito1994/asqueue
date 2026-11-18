<?php

namespace App\Http\Controllers;

use App\Http\Services\StudentService;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StudentController extends Controller
{
    public function __construct (
        protected readonly StudentService $student
    ) {}

    public function index(Request $request): JsonResponse|Response
    {
        try {
            $res = $this->student->index($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function create(Request $request): JsonResponse|Response
    {
        try {
            $res = $this->student->create($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function confirmCreate(Request $request): JsonResponse|Response
    {
        try {
            $res = $this->student->confirmCreate($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function findStudent(Request $request): JsonResponse|Response
    {
        try {
            $res = $this->student->findStudent($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }

    public function findByEnrollmentNumber(Request $request): JsonResponse|Response
    {
        try {
            $res = $this->student->findByEnrollmentNumber($request);
            return response()->json($res['data'] ?? $res);
        } catch (\Exception $e) {
           return $this->processException($e);
        }
    }
}
