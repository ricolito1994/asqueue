<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class JwtMiddleware extends BaseMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            JWTAuth::parseToken()->authenticate();
        } 
        catch (TokenInvalidException $e) {
            return response()->json(['status' => 'Invalid Token'], 422);
        }
        catch (TokenExpiredException $e) {
            return response()->json(['status' => 'Token is Expired'], 500);
        }
        catch (\Exception $e) {
            return response()->json(['status' => 'Authorization token not found.'], 404);
        }
        return $next($request);
    }
}
