<?php

namespace App\Http\Controllers;

use App\Models\Window;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Exception;

class WindowController extends Controller
{
    public function index(Request $request)
    {
        try {
            $windowData = Window::filter($request)
                ->with([
                    'concerns',
                    'transactions' => function ($q) {
                        $q->whereDate('created_at', Carbon::today())
                            ->where('status', 'processed')
                            ->orderBy('process_start_at', 'desc');
                    },
                    'sessions' => function ($q) use ($request) {
                        $q->filter($request);
                    }
                ])
                ->paginate(10);
            return response()->json($windowData, 200);
        } catch (Exception $e) {
            response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function findByAssignedTo(Request $request, int $user_id) 
    {
         try {
            $windowData = Window::where('assigned_to', $user_id)->filter($request)
                ->with([
                    'transactions' => function($q) {
                        $q->whereDate('created_at', Carbon::today())
                            ->where('status', 'processed')
                            ->orderBy('process_start_at', 'desc')
                            ->with('concern')
                            ->limit(1);
                    },
                    'sessions' => function ($q) use ($request) {
                        $q->filter($request);
                    }
                ])
                ->first();
                
            return response() -> json ($windowData, 200);
            
        } catch (Exception $e) {
            response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'department_id' => 'required|integer',
            ]);

            $window = Window::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'department_id' => $validated['department_id'],
                'company_id' => 1,
                'assigned_to' => null,
            ]);

            return response()->json($window->fresh(), 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong.',
            ], 500);
        }
    }

    public function update(Request $request, int $window): JsonResponse
    {
        try {
            $windowData = Window::findOrFail($window);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'department_id' => 'required|integer',
            ]);

            $windowData->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'department_id' => $validated['department_id'],
            ]);

            return response()->json($windowData->fresh(), 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong.',
            ], 500);
        }
    }

    public function assign(Request $request, int $window): JsonResponse
    {
        try {
            $windowData = Window::findOrFail($window);

            $validated = $request->validate([
                'user_id' => 'nullable|integer',
            ]);

            if ($validated['user_id'] !== null) {
                $alreadyAssigned = Window::where('assigned_to', $validated['user_id'])
                    ->where('id', '!=', $window)
                    ->exists();

                if ($alreadyAssigned) {
                    return response()->json([
                        'success' => false,
                        'message' => 'This user is already assigned to another window.',
                    ], 422);
                }
            }

            $windowData->update([
                'assigned_to' => $validated['user_id'],
            ]);

            return response()->json($windowData->fresh(), 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong.',
            ], 500);
        }
    }

}
