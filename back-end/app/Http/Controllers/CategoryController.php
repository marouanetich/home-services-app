<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index() {
        try {
            $categories = Category::all();

            if ($categories->isEmpty()) {
                return response()->json([
                    'error' => true,
                    'message' => __('categories.not_available')
                ], 404);
            }

            return response()->json([
                'error' => false,
                'categories' => $categories
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());

            return response()->json([
                'error' => true,
                'message' => __('errors.server_error')
            ], 500);
        }
    }
}
