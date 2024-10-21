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

Route::get('/parent', function () {
    return view('parent');
});

Route::get('/plain', function () {
    return view('plain-wrapper');
});

Route::get('/fetcher', function () {
    return view('fetcher');
});

