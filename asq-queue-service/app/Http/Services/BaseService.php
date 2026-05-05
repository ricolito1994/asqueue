<?php

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Pool;
use GuzzleHttp\Exception\RequestException;
use App\Exceptions\ServiceException;

class BaseService
{
    public Client $client;

    public function __construct() {
        $this->client = new Client;
    }
    //
    public function asyncRequest(array $requestData): array
    {
        $client = $this->client;
        $response = null;

        if (count($requestData) === 1) {
            return $this->singleAsyncRequest(
                $requestData[0]['method'],
                $requestData[0]['url'],
                $requestData[0]['headers'],
                $requestData[0]['options']
            );
        }
        
        // assign to pool for multiple async request
        $request = function () use ($requestData) {
            foreach ($requestData as $key => $req):
                yield $key => $this->asyncMethods(
                    $req['method'],
                    $req['url'],
                    $req['headers'],
                    $req['options']
                );
            endforeach;
        };

        $pool = new Pool($client, $request(), [
            'concurrency' => count($requestData),
            'fulfilled' => function ($res, $key) use (&$response) {
                $response[$key] = json_decode($res->getBody(), true);
            },
            'rejected' => function ($reason, $key) use (&$response) {
                if ($reason->hasResponse()) {
                    $res = $reason->getResponse();
                    $contents = $res->getBody()->getContents();

                    $response[$key] = json_decode($contents, true);
                } else {
                    $response[$key] = [
                        'message' => "Failed",
                        'reason' => $e->getMessage(),
                        'success' => false,
                    ];
                }
            }
        ]);

        $pool->promise()->wait();

        return $response;
    }

    protected function singleAsyncRequest(
        $method, 
        $url, 
        $headers, 
        $options
    ): mixed {
        try {
            $promise = $this->asyncMethods(
                $method, 
                $url, 
                $headers, 
                $options
            );

            $res = $promise()->wait();
            return [
                "data" => json_decode($res->getBody()->getContents(), true),
                "status" => $res->getStatusCode()
            ];
        } catch (\Exception $e) {
            if ($e instanceof RequestException) {
                if ($e->hasResponse()) {
                    $errorResponse = $e->getResponse();

                    throw new ServiceException(
                        json_decode($errorResponse->getBody()?->getContents() ?? ["message" => "Failed"], true),
                        $errorResponse->getStatusCode(),
                        "Service Failed",
                    );
                }
            }

            throw new ServiceException(
                [
                    "message" => "Failed, something went wrong.",
                    "reason" => $e->getMessage(),
                    "success" => false,
                ],
                500,
                "Failed, something went wrong.",
            );
        }
    }

    protected function asyncMethods(
        $method, 
        $url, 
        $headers, 
        $options
    ): mixed {
        $client = new Client;
        return match ($method) {
            'GET' => function () use ($url, $headers, $options, $client) {
                return $client->getAsync($url, [
                    'headers' => $headers,
                    'json' => $options,
                ]);
            },
            'POST' => function () use ($url, $headers, $options, $client) {
                return $client->postAsync($url, [
                    'headers' => $headers,
                    'json' => $options
                ]);
            },
            'PUT' => function () use ($url, $headers, $options, $client) {
                return $client->putAsync($url, [
                    'headers' => $headers,
                    'json' => $options
                ]);
            },
            'DELETE' => function () use ($url, $headers, $options, $client) {
                return $client->deleteAsync($url, [
                    'headers' => $headers,
                    'json' => $options
                ]);
            }
        };
    }

}
