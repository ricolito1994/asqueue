<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    public function index (Request $request): JsonResponse
    {
        try {
            $result = Department::query()
                ->filter($request)
                ->paginate($request->input('per_page', 10));

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong.',
                'success' => false,
                'reason' => $e->getMessage()
            ], 500);
        }
    }
    public function find(int $department): JsonResponse
    {
        try {
            $dept = Department::with('company')->findOrFail($department);
            return response()->json($dept, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'success' => false,
                'reason' => $e->getMessage()
            ], 500);
        }
    }
}
