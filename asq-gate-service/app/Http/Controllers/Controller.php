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

        if (json_last_error() === JSON_ERROR_NONE) {
            return response()->json($message, 500);
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
