<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    public function find(int $company): JsonResponse
    {
        try {
            $company = Company::with('departments')->find($company);
            return response()->json($company, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'success' => false,
                'reason' => $e->getMessage()
            ], 500);
        }
    }
}
