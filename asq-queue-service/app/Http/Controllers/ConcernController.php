<?php

namespace App\Http\Controllers;

use DB;
use Exception;
use App\Models\Concern;
use Illuminate\Http\Request;

class ConcernController extends Controller
{
    public function index(Request $request)
    {
        try {
            $concernData = Concern::filter($request)
                ->with('windows')
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Concern $concern)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Concern $concern)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Concern $concern)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Concern $concern)
    {
        //
    }
}
