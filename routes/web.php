<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/chat', function () {
    return inertia('Chat');
});
