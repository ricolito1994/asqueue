<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\RefreshToken;
use App\Http\Services\QueueManagerService;
use Carbon\Carbon;

class AuthenticationController extends Controller
{
    
    public function __construct(
        protected readonly QueueManagerService $queueManagerService
    ){}

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
            $now = Carbon::now();
            $credentials = $request->only("username", "password");

            if (! $token = auth()->attempt($credentials)) {
                return response()->json([
                    "message" => "Login failed.",
                    "reason" => "Invalid username or password.",
                    "success" => false,
                ], 401);
            }

            $user = auth()->user();

            $window = $this->queueManagerService->windowAssignedTo($request, $user->id);

            $request->merge([
                'session_type' => 'active',
                'created_by' => $user->id, 
                'department_id' => $user->department_id,
                'window_id' => $window['data']['id'] ,
                'date' => $now->toDateString(),
                'start_time' => $now->format('H:i:s'),
                'company_id' => $user->company_id,
                'last_queue_number' => 0
            ]);

            $session = $this->queueManagerService->createQueueSession($request);

            return $this->respondWithToken($token, $user, $session[0]['id']);
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
            $user = auth()->user();

            $now = Carbon::now();

            # $window = $this->queueManagerService->windowAssignedTo($request, $user->id);

            $request->merge([
                'session_type' => 'inactive',
                'end_time' => $now->format('H:i:s'),
                'department_id' => $user->department_id,
                'company_id' => $user->company_id,
                'window_id' => $request->input('window_id', 0)
            ]);

            $this->queueManagerService->updateQueueSession($request, $request->input('session_id', 0));
            
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

    protected function respondWithToken(mixed $token, User $user = null, int|null $session_id = null): JsonResponse 
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
            'session_id' => $session_id ?? null
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
