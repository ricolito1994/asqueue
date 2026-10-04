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

    public function adminIndex(Request $request)
    {
        try {
            $concernData = Concern::filter($request)
                ->with([
                    'windows' => function ($q) {
                        $q->select([
                            'windows.id',
                            'windows.name',
                        ]);
                    }
                ])
                ->paginate(10);

            return response()->json($concernData, 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $concern = Concern::create([
                'name' => $request->name,
                'description' => $request->description,
                'department_id' => $request->department_id,
                'company_id' => 1,
            ]);

            return response()->json($concern, 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Concern $concern)
    {
        try {
            $concern->update($request->all());

            return response()->json($concern, 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Concern $concern)
    {
        try {
            $concern->delete();

            return response()->json([
                'success' => true,
                'message' => 'Concern deleted successfully.'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

    public function assignWindows(Request $request, Concern $concern)
    {
        try {
            $validated = $request->validate([
                'window_ids' => 'required|array',
                'window_ids.*' => 'integer',
            ]);

            $concern->windows()->sync($validated['window_ids']);

            return response()->json(
                $concern->load('windows'),
                200
            );

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'reason' => $e->getMessage()
            ], 500);
        }
    }

}
