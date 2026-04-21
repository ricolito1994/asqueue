<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'api/auth',
    'namespace' => 'App\Http\Controllers'
], function () {
    
    Route::post ('/login', 'AuthenticationController@login');
    Route::post ('/refresh', 'AuthenticationController@refreshAccessToken');

    Route::group([
        'prefix' => 'department'
    ], function () {
        Route::get('{department}', 'DepartmentController@find');
    });

    Route::group([
        'middleware' => ['jwt.auth.middleware']
    ], function () {
        Route::post('/logout', 'AuthenticationController@logout');
        Route::get('/me', 'AuthenticationController@me');
    });

    Route::group([
        'prefix' => 'user',
        'middleware' => ['jwt.auth.middleware']
    ], function () {
        Route::get('', 'UserController@index');
        Route::post('', 'UserController@create');
        Route::patch('{user}', 'UserController@update');
        Route::get('{user}', 'UserController@find');
        Route::delete('{user}', 'UserController@delete');
    });

});