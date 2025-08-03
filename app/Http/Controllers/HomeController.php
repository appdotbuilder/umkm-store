<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredProducts = Product::with(['category', 'images'])
            ->active()
            ->featured()
            ->inStock()
            ->limit(8)
            ->get();

        $categories = Category::active()
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        $newProducts = Product::with(['category', 'images'])
            ->active()
            ->inStock()
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'newProducts' => $newProducts,
        ]);
    }
}