<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
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
