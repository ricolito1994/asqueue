<?php

use Illuminate\Support\Facades\Route;
# use Illuminate\Support\Facades\Redis;

Route::group([
    'prefix' => 'api/notif',
    'namespace' => 'App\Http\Controllers',
], function () {
    Route::group([
        'prefix' => 'queue',
        'middleware' => ['jwt.auth.middleware']
    ], function () {
        Route::post ('process', 'NotificationsController@processNextQueueNumber');
        Route::get ('recall/{queueNumber}', 'NotificationsController@recallQueueNumberEvent');
        
    });

    Route::group([
        'prefix' => 'user'
    ],function () {
        Route::post ('active', 'NotificationsController@updateActiveUser');
    });

    Route::get('update-queue-list/{windowId}/company/{companyId}', 'NotificationsController@updateQueueList');
});