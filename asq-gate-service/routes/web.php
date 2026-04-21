<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'api',
    'namespace' => 'App\Http\Controllers'
], function () {

    Route::group([
        'middleware' => ['jwt.auth.middleware']
    ],function () {
        
    });

});