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
        Route::get ('updateQueueList/{windowId}', 'NotificationsController@updateQueueList');
    });
});