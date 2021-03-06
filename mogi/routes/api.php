<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'
], function () {
  Route::post('login', [AuthController::class, 'login'])->name('jwt.login');;
  Route::post('register', [AuthController::class, 'register'])->name('jwt.register');
  Route::post('logout', [AuthController::class, 'logout'])->name('jwt.logout');;
  Route::post('refresh', [AuthController::class, 'refresh'])->name('jwt.refresh');;
  Route::post('me', [AuthController::class, 'me'])->name('jwt.me');;
});

Route::Resource('products', ProductController::class)->only(['index']);
Route::Resource('orders', OrderController::class);
