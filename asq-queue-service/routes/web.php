<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'api/queue',
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
    });

    Route::group([
        'prefix' => 'windows',
    ], function () {
        Route::get('', 'WindowController@index');
        Route::get('/assignedto/{user_id}', 'WindowController@findByAssignedTo');
    });

    Route::group([
        'middleware' => ['jwt.auth.middleware']
    ], function(){

        Route::group([
            'prefix' => 'session',
        ], function () {
            
        });

    }); 

});