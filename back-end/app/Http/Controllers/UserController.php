<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getLastUserId() {
        $user = User::latest()->pluck('id')->first();

        return response()->json([
            'last_user_id' => $user
        ]);
    }
}
