<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 50000, 1000000);
        $taxAmount = $subtotal * 0.1;
        $shippingAmount = fake()->randomElement([0, 15000, 25000]);
        $discountAmount = fake()->optional(0.3)->randomFloat(2, 5000, 50000) ?: 0;
        $totalAmount = $subtotal + $taxAmount + $shippingAmount - $discountAmount;

        return [
            'order_number' => 'ORD-' . fake()->unique()->randomNumber(8),
            'user_id' => User::factory(),
            'status' => fake()->randomElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_amount' => $shippingAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'currency' => 'IDR',
            'payment_method' => fake()->randomElement(['bank_transfer', 'cod', 'e_wallet']),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'failed', 'refunded']),
            'billing_address' => [
                'name' => fake()->name(),
                'street' => fake()->streetAddress(),
                'city' => fake()->city(),
                'postal_code' => fake()->postcode(),
                'country' => 'Indonesia',
                'phone' => fake()->phoneNumber(),
            ],
            'shipping_address' => [
                'name' => fake()->name(),
                'street' => fake()->streetAddress(),
                'city' => fake()->city(),
                'postal_code' => fake()->postcode(),
                'country' => 'Indonesia',
                'phone' => fake()->phoneNumber(),
            ],
            'shipping_method' => fake()->randomElement(['standard', 'express', 'overnight']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}