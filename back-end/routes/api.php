<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'register']);
Route::post('/signin', [AuthController::class, 'login']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/popular-services', [ServiceController::class, 'getPopularServices']);
Route::get('/services/category/{categoryName}', [ServiceController::class, 'getServicesByCategoryName']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/{service}/availability/{date}', [BookingController::class, 'getUnavailableTimeSlots']);
Route::get('/bookings/{customerId}/status/{status}', [BookingController::class, 'getBookingsByCustomer']);

Route::get('/customers/{userId}', [CustomerController::class, 'getCustomerByUser']);
Route::post('/customers', [CustomerController::class, 'store']);

Route::get('/users/last-user', [UserController::class, 'getLastUserId']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/signout', [AuthController::class, 'logout']);
});
