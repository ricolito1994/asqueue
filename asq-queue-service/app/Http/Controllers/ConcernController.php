<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use App\Models\Concern;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ConcernController extends Controller
{
    public function index(Request $request)
    {
        try {
            $concernData = Concern::filter($request)
                ->with(['windows' => function ($q) use ($request) {
                    $q->with(['sessions' => function ($r) use ($request) {
                        if (! isset($request->date)) {
                            $request->merge([
                                'date' => Carbon::now()->format('Y-m-d')
                            ]);
                        }
                        if (! isset($request->session_type)) {
                            $request->merge([
                                'session_type' => 'active'
                            ]);
                        }
                        $r->filter($request);
                    }]);
                }])
                ->paginate(10);
            
            return response() -> json ($concernData, 200);
            
        } catch (Exception $e) {
            response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

}
