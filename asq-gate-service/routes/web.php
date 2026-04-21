<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

Route::group([
    'prefix' => 'api',
    'namespace' => 'App\Http\Controllers'
], function () {
    Route::get('/', function () {
        dd(Redis::ping());
    });

    Route::group([
        'middleware' => ['jwt.auth.middleware']
    ],function () {
        
    });

});