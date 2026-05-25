<?php

namespace App\Http\Controllers;

use App\Models\window;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

}
