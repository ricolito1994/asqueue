<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'onequeue',
    'namespace' => 'App\Http\Controllers'
], function () {
    Route::get('', "OneQueueController@index");

    Route::group([
        'prefix' => 'student'
    ], function () {
        Route::get('', 'StudentController@index');
        Route::post('', 'StudentController@create');
        Route::post('create-confirm', 'StudentController@createConfirm');
        Route::get('find-student', 'StudentController@findStudent');
        Route::get('find-by-enrollment-number', 'StudentController@findByEnrollmentNumber');
    });
});
