<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(random_int(2, 4), true);
        $price = fake()->randomFloat(2, 10000, 500000);
        $salePrice = fake()->boolean(30) ? fake()->randomFloat(2, $price * 0.5, $price * 0.9) : null;

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name) . '-' . fake()->unique()->randomNumber(4),
            'sku' => 'SKU-' . fake()->unique()->randomNumber(6),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'price' => $price,
            'sale_price' => $salePrice,
            'stock_quantity' => fake()->numberBetween(0, 100),
            'manage_stock' => true,
            'in_stock' => fake()->boolean(85),
            'is_featured' => fake()->boolean(20),
            'status' => fake()->randomElement(['active', 'inactive', 'draft']),
            'weight' => fake()->randomFloat(2, 0.1, 10),
            'dimensions' => fake()->randomNumber(2) . 'x' . fake()->randomNumber(2) . 'x' . fake()->randomNumber(2) . ' cm',
            'category_id' => Category::factory(),
        ];
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'in_stock' => true,
        ]);
    }
}