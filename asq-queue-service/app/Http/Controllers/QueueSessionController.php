<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use App\Models\QueueSession;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QueueSessionController extends Controller
{

    public function index(Request $request): JsonResponse
    {
        try {
            $sessionQuery = QueueSession::filter($request->all());

            $sessionData = $request->filled('per_page') ? 
                $sessionQuery->paginate($request->per_page) : 
                $sessionQuery->get();

            return response()->json($sessionData, 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'reason' => $e->getMessage(),
                'message' => "Something went wrong."
            ], 500);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            $session = QueueSession::lockForUpdate()->create($request->all());

            return response()->json($session->fresh(), 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'reason' => $e->getMessage(),
                'message' => "Something went wrong."
            ], 500);
        }
    }

    public function update(Request $request, QueueSession $session): JsonResponse
    {
        try {
            $updated = DB::transaction(function () use ($session, $request) {
                $lockedSession = QueueSession::where('id', $session->id)
                    ->lockForUpdate()
                    ->first();
                
                $lockedSession->update($request->all());

                return $lockedSession->fresh();
            });

            return response()->json($updated, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'reason' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

}
