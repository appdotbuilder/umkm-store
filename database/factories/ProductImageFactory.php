<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductImage>
 */
class ProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'image_path' => 'https://picsum.photos/400/400?random=' . fake()->unique()->randomNumber(6),
            'alt_text' => fake()->sentence(3),
            'is_primary' => false,
            'sort_order' => fake()->numberBetween(0, 10),
        ];
    }

    /**
     * Indicate that this is the primary image.
     */
    public function primary(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_primary' => true,
            'sort_order' => 0,
        ]);
    }
}