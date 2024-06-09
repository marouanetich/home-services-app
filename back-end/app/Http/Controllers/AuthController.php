<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string',
            'role' => 'required|in:Customer,Service Provider',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);

        $imagePath = null;
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $imageName);
            $imagePath = 'images/' . $imageName;
        }

        $user = new User([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'role' => $request->role,
            'image' => $imagePath
        ]);

        $user->save();

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            $imageUrl = $user->image ? asset($user->image) : null;

            $userData = [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'image' => $imageUrl,
            ];

            return response()->json([
                'token' => $token,
                'user' => $userData,
            ], 200);
        } else {
            return response()->json(['error' => 'One or more details are incorrect!'], 401);
        }
    }

    public function logout(Request $request) {
        $user = Auth::user();

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'user' => $user,
            'message' => 'Logged out successfully'
        ]);
    }
}
