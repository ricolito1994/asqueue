<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\RefreshToken;

class AuthenticationController extends Controller
{
    //
    public function index (): JsonResponse 
    {
        return response()->json([
            "message" => "this is auth-service authentication controller.",
            "success" => true
        ],200);
    }

    public function login (Request $request): JsonResponse 
    {
        try {
            $credentials = $request->only("username", "password");
            
            if (! $token = auth()->attempt($credentials)) {
                return response()->json([
                    "message" => "Login failed.",
                    "reason" => "Invalid username or password.",
                    "success" => false,
                ], 401);
            }

            return $this->respondWithToken($token, auth()->user());
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Login failed.",
                "reason" => $e->getMessage(),
                "success" => false,
            ], 500);
        }
    }

    public function refreshAccessToken(Request $request): JsonResponse 
    {
        try {
            $token = $request->input('refresh_token');

            if (! $token) {
                return response()->json([
                    "message" => "Refresh token is required.",
                    "success" => false
                ],400);
            }

            $refreshToken = RefreshToken::where('token', $token)
                ->active()
                ->first();
            
            if (! $refreshToken) {
                return response()->json([
                    "message" => "Refresh token is expired or not found. You need to reauthenticate.",
                    "success" => false,
                ], 422);
            }

            $user = $refreshToken->user;

            $generatedNewAccessToken = auth()->login($user);

            # $refreshToken->delete();

            return $this->respondWithToken($generatedNewAccessToken, $user);

        } catch (\Exception $e) {
            return response()->json([
                "message" => "",
                "reason" => $e->getMessage(),
                "success" => false,
            ]);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            auth()->logout();

            return response()->json([
                "message" => "User logged out successfully.",
                "success" => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Something went wrong",
                "reason" => $e->getMessage(),
                "success" => false,
            ], 500);
        }
    }

    public function me (): JsonResponse 
    {
        return response()->json([
            "user" => auth()->user(),
            "success" => true,
        ], 200);
    }

    protected function respondWithToken(mixed $token, User $user = null): JsonResponse 
    {
        if ($user) {
            $user->load(['company', 'department']);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'refresh_token' => $user ? $user->createRefreshToken() : null,
            'user' => $user ?? null,
        ], 200);
    }

    public function findUser(User $user): JsonResponse 
    {
        try {
            return response ()->json ($user, 200);
        } catch (\Exception) {
            return response ()->json ([
                "message" => "Failed",
                "reason" => $e->getMessage(),
                "success" => false,
            ], 500);
        }
    }
}
