<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\StoreSetting;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // Create customer user
        User::factory()->create([
            'name' => 'Test Customer',
            'email' => 'customer@example.com',
            'role' => 'customer',
        ]);

        // Create additional users
        User::factory(10)->create();

        // Create categories
        $categories = Category::factory(8)->create();

        // Create products with images
        $categories->each(function ($category) {
            $products = Product::factory(random_int(3, 8))
                ->active()
                ->create(['category_id' => $category->id]);

            $products->each(function ($product) {
                // Create primary image
                ProductImage::factory()
                    ->primary()
                    ->create(['product_id' => $product->id]);

                // Create additional images
                ProductImage::factory(random_int(1, 3))
                    ->create(['product_id' => $product->id]);
            });
        });

        // Mark some products as featured
        Product::active()->inRandomOrder()->limit(12)->update(['is_featured' => true]);

        // Create coupons
        Coupon::factory(5)->create();

        // Create store settings
        $this->createStoreSettings();
    }

    /**
     * Create default store settings.
     */
    protected function createStoreSettings(): void
    {
        $settings = [
            ['key' => 'store_name', 'value' => 'UMKM Online Store', 'type' => 'string'],
            ['key' => 'store_description', 'value' => 'Your trusted online marketplace for local UMKM products', 'type' => 'string'],
            ['key' => 'store_address', 'value' => 'Jakarta, Indonesia', 'type' => 'string'],
            ['key' => 'store_phone', 'value' => '+62 123 456 7890', 'type' => 'string'],
            ['key' => 'store_email', 'value' => 'info@umkmstore.com', 'type' => 'string'],
            ['key' => 'currency', 'value' => 'IDR', 'type' => 'string'],
            ['key' => 'tax_rate', 'value' => '10', 'type' => 'float'],
            ['key' => 'shipping_rate', 'value' => '15000', 'type' => 'float'],
            ['key' => 'free_shipping_threshold', 'value' => '100000', 'type' => 'float'],
            ['key' => 'payment_methods', 'value' => '["bank_transfer", "cod", "e_wallet"]', 'type' => 'json'],
            ['key' => 'bank_accounts', 'value' => '[{"bank": "BCA", "account": "1234567890", "name": "UMKM Store"}, {"bank": "Mandiri", "account": "0987654321", "name": "UMKM Store"}]', 'type' => 'json'],
        ];

        foreach ($settings as $setting) {
            StoreSetting::create($setting);
        }
    }
}