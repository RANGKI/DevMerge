<?php

use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});

Route::middleware(['web'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::resource('chat',ChatMessageController::class);
    });
    
    Route::prefix('auth')->group(function () {
        Route::resource('login',UserController::class);
    });
});

