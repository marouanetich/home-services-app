<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Category;

class ServiceController extends Controller
{
    public function index() {
        $services = Service::with('category')->get();

        return response()->json([
            'services' => $services
        ]);
    }

    public function getPopularServices() {
        $popularServices = Service::with('category')->orderBy('popularity', 'desc')->limit(5)->get();

        return response()->json(['popular_services' => $popularServices], 200);
    }

    public function getServicesByCategoryName($categoryName) {
        $category = Category::where('name', $categoryName)->first();

        if (!$category):
            return response()->json(['services' => []]);
        endif;

        $services = Service::with('category')->where('category_id', $category->id)->get();

        return response()->json([
            'services' => $services
        ]);
    }

    public function show($id) {
        $service = Service::with(['category', 'provider.user'])->findOrFail($id);

        return response()->json([
            'service' => $service
        ]);
    }
}
