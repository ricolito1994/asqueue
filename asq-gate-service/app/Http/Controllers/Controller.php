<?php

namespace App\Http\Controllers;


use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

abstract class Controller
{
    //
    private function isHtml(string $string): bool
    {
        return $string !== strip_tags($string);
    }

    protected function processException (\Exception $e): JsonResponse|Response
    {
        $message = json_decode($e->getMessage(), true);

        // Changed so it returns the original error code
        if (json_last_error() === JSON_ERROR_NONE) {
            return response()->json($message, $e->getCode());
        }

        $message = $e->getMessage();

        // Check if message is HTML
        if ($this->isHtml($message)) {
            return response($message, 500)
                ->header('Content-Type', 'text/html');
        }

        return response()->json([
            'message' => $message
        ], 500);
    }
}
