<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\RefreshToken;

class UserController extends Controller
{
    
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

    public function create (Request $request): JsonResponse 
    {
        
    }

    public function update (Request $request, User $user): JsonResponse 
    {
        
    }

    public function delete (User $user): JsonResponse 
    {
        
    }
}
