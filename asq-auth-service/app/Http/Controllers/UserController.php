<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\RefreshToken;
use App\Http\Services\QueueManagerService;
use Carbon\Carbon;

class UserController extends Controller
{
    public function __construct (
        protected readonly QueueManagerService $queueManagerService
    ){}

    public function index (Request $request): JsonResponse 
    {
        try {
            $users = User::filter($request->all())
                ->with('department')
                ->paginate(10);

            return response ()->json($users, 200);

        } catch (\Exception $e) {
            return response()->json([
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong',
                'success' => false
            ], 500);
        }
    }

    public function find (User $user): JsonResponse 
    {
        try {
            return response ()->json($user, 200);

        } catch (\Exception $e) {
            return response()->json([
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong',
                'success' => false
            ], 500);
        }
    }

    public function setActiveSession(Request $request, User $user): JsonResponse
    {
        try {
            $now = Carbon::now();

            $request->merge([
                'session_type' => 'active',
                'created_by' => $user->id, 
                'department_id' => $user->department_id,
                'window_id' => $request->input('window_id', 0),
                'date' => $now->toDateString(),
                'start_time' => $now->format('H:i:s'),
                'company_id' => $user->company_id,
                'last_queue_number' => 0
            ]);

            $session = $this->queueManagerService->createQueueSession($request);

            return response()->json($session, 200);

        } catch (\Exception $e) {
            return response()->json([
                'reason' => $e->getMessage(),
                'message' => 'Something went wrong',
                'success' => false
            ], 500);
        }
    }

public function create (Request $request): JsonResponse 
{
    try {
        // Original validation rules before making fields nullable
        
        // $validated = $request->validate([
        //     'firstname' => 'nullable|string',
        //     'lastname' => 'nullable|string',
        //     'designation' => 'required|string',
        //     'email' => 'required|email|unique:users,email',
        //     'username' => 'required|string|unique:users,username',
        //     'password' => 'required|string|min:6',
        //     'title' => 'nullable|string',
        //     'window_id' => 'nullable|integer',
        //     'company_id' => 'required|integer',
        //     'department_id' => 'required|integer',
        // ]);

        $validated = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create($validated);

        return response()->json($user, 201);

    } catch (\Exception $e) {
        return response()->json([
            'reason' => $e->getMessage(),
            'message' => 'Something went wrong',
            'success' => false
        ], 500);
    }
}

    public function update (Request $request, User $user): JsonResponse 
    {
        
    }

    public function delete (User $user): JsonResponse 
    {
        
    }
}
