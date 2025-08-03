<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreSetting>
 */
class StoreSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => 'test_' . fake()->unique()->word(),
            'value' => fake()->sentence(),
            'type' => fake()->randomElement(['string', 'boolean', 'integer', 'float', 'json']),
            'description' => fake()->optional()->sentence(),
        ];
    }
}