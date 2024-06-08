<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required|exists:customers,id',
            'provider_id' => 'required|exists:providers,id',
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time_slot' => 'required|date_format:H:i',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::create([
            'customer_id' => $request->customer_id,
            'provider_id' => $request->provider_id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time_slot' => $request->time_slot,
            'price' => $request->price,
            'status' => $request->status,
        ]);

        return response()->json(['booking' => $booking], 201);
    }

    public function getUnavailableTimeSlots($service, $date) {
        $bookings = Booking::where('service_id', $service)->where('date', $date)->get();

        return response()->json([
            'bookings' => $bookings
        ]);
    }

    public function getBookingsByCustomer($id, $status) {
        $bookings = Booking::with(['service', 'provider', 'provider.user'])->where('customer_id', $id)->where('status', $status)->get();

        return response()->json([
            'bookings' => $bookings
        ]);
    }
}
