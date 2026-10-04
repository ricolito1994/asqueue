<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'queue',
    'namespace' => 'App\Http\Controllers'
], function () {

    Route::group([
        'prefix' => 'transaction',
    ], function () {
        Route::get('', 'TransactionController@index');
        Route::post('', 'TransactionController@create');

        Route::group([
            'middleware' => ['jwt.auth.middleware']
        ], function(){
            Route::post('process', 'TransactionController@processQueueNumber');
            Route::get('recall/{queueNumber}', 'TransactionController@recallQueueNumber');
        });
    });

    Route::group([
        'prefix' => 'concerns',
    ], function () {
        Route::get('', 'ConcernController@index');
        Route::get('admin', 'ConcernController@adminIndex');
        Route::post('', 'ConcernController@store');
        Route::patch('{concern}', 'ConcernController@update');
        Route::delete('{concern}', 'ConcernController@destroy');

        Route::post('{concern}/windows', 'ConcernController@assignWindows');
    });

    Route::group([
        'prefix' => 'windows',
    ], function () {
        Route::get('', 'WindowController@index');
        Route::post('', 'WindowController@create');
        Route::patch('/{window}', 'WindowController@update');
        Route::patch('/{window}/assign', 'WindowController@assign');
        Route::get('/assignedto/{user_id}', 'WindowController@findByAssignedTo');
    });

    Route::group([
        'prefix' => 'session',
    ], function () {
        Route::post('', 'QueueSessionController@create');
        Route::group([
            'middleware' => ['jwt.auth.middleware']
        ], function(){
            Route::get('', 'QueueSessionController@index');
            Route::patch('{session}', 'QueueSessionController@update');
        });
    });


});