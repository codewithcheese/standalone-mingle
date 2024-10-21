<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/builder', function () {
    return view('builder');
});

Route::get('/stream', function () {
    return view('stream');
});
