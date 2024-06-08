<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function getCustomerByUser($id) {
        $customer = Customer::where('user_id', $id)->first();

        return response()->json([
            'customer' => $customer
        ]);
    }

    public function store(Request $request) {
        $customer = new Customer([
            'user_id' => $request->user_id
        ]);

        $customer->save();

        return response()->json([
            'message' => 'Customer has been inserted successfully!'
        ]);
    }
}
