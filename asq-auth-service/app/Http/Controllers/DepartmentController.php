<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    public function index(Request $request): JsonResponse
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

    public function all(): JsonResponse
    {
        try {
            $departments = Department::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                    'company_id',
                ]);

            return response()->json($departments, 200);

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

    public function create(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $department = Department::create([
                'name' => $validated['name'],
                'company_id' => 1,
            ]);

            return response()->json($department, 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'success' => false,
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, int $department): JsonResponse
    {
        try {
            $dept = Department::findOrFail($department);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $dept->update([
                'name' => $validated['name'],
            ]);

            return response()->json($dept->fresh(), 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'success' => false,
                'reason' => $e->getMessage()
            ], 500);
        }
    }
}