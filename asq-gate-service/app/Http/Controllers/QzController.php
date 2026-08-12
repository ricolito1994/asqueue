<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class QzController extends Controller
{
    //
    public function certificate(Request $request): Response|JsonResponse
    {
        try {
            $qzCert = storage_path("app/qz/digital-certificate.txt");
            $certificate = file_get_contents($qzCert);

            return response ($certificate, 200)
                -> header('Content-Type', 'text/plain');
        } catch (\Exception $e) {
            return $this->processException ($e);
        }
    }

    public function sign(Request $request): Response|JsonResponse
    {
        try {
            $toSign = $request->input('request');

            if (! $toSign) {
                return response()
                    ->json([
                        'message' => 'Missing request data',
                        'success' => false
                    ], 400);
            }

            $privateKeyPath = storage_path("app/qz/private-key.pem");

            $privateKeyFile = file_get_contents($privateKeyPath);

            $privateKey = openssl_pkey_get_private($privateKeyFile);

            if (! $privateKey) {
                return response ()
                    ->json ([
                        'message' => 'Invalid Private Key.',
                        'success' => false,
                    ], 500);
            }

            openssl_sign(
                $toSign,
                $signature,
                $privateKey,
                OPENSSL_ALGO_SHA512
            );

            return response(base64_encode($signature), 200)
                ->header('Content-Type', 'text/plain');

        } catch (\Exception $e) {
            return $this->processException ($e);
        }
    }
}
