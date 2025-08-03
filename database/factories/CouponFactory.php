<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['fixed', 'percentage']);
        $value = $type === 'percentage' ? fake()->numberBetween(5, 50) : fake()->numberBetween(10000, 100000);

        return [
            'code' => 'COUPON' . fake()->unique()->randomNumber(4),
            'name' => fake()->words(2, true) . ' Discount',
            'description' => fake()->sentence(),
            'type' => $type,
            'value' => $value,
            'minimum_amount' => $type === 'percentage' ? fake()->numberBetween(50000, 200000) : null,
            'usage_limit' => fake()->optional()->numberBetween(10, 100),
            'used_count' => 0,
            'is_active' => fake()->boolean(80),
            'starts_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
            'expires_at' => fake()->optional()->dateTimeBetween('now', '+3 months'),
        ];
    }
}