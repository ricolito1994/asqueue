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
        'prefix' => 'qz'
    ], function () {
        Route::get('certificate', 'QzController@certificate');
        Route::post('sign', 'QzController@sign');
    });

    Route::group([
        'prefix' => 'auth'
    ],function () {
        Route::post('login', "GateAuthController@login");
        Route::post('logout', "GateAuthController@logout");
        Route::post('refresh', "GateAuthController@refresh");
        Route::post('me', "GateAuthController@me");

        Route::group([
            'prefix' => 'user',
        ], function () {
            Route::get('', 'GateUserController@index');
            Route::post('', 'GateUserController@create');
            Route::patch('{userId}', 'GateUserController@update');
            Route::get('{userId}', 'GateUserController@find');
            Route::delete('{userId}', 'GateUserController@delete');
            Route::post('set-active-session/{userId}', 'GateUserController@setActiveSession');
        });

        Route::group([
            'prefix' => 'department'
        ],function () {
            Route::get('{deptId}', 'GateUserController@departmentFind');
        });
    });
    

    Route::group([
        'prefix' => 'queue'
    ],function () {
        Route::group([
            'prefix' => 'transaction'
        ],function () {
            Route::get('', 'GateQueueController@transactionIndex');
            Route::post('', 'GateQueueController@transactionCreate');
            Route::post('process', 'GateQueueController@transactionProcessQueueNumber');
            Route::get('recall/{queueNumber}', 'GateQueueController@transactionRecallQueueNumber');
        });
        Route::group([
            'prefix' => 'concerns'
        ],function () {
            Route::get('', 'GateQueueController@concernIndex');
        });
        Route::group([
            'prefix' => 'windows'
        ],function () {
            Route::get('', 'GateQueueController@windowIndex');
            Route::get('/assignedto/{user_id}', 'GateQueueController@windowAssignedTo');
        });
        Route::group([
            'prefix' => 'sessions'
        ],function () {
            Route::post('', 'GateQueueController@sessionCreate');
            Route::get('', 'GateQueueController@sessionIndex');
            Route::patch('{session}', 'GateQueueController@sessionUpdate');
        });
    });

});