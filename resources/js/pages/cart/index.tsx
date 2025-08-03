import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { StoreLayout } from '@/components/store-layout';

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        sale_price?: number;
        stock_quantity: number;
        images: ProductImage[];
    };
}

interface ProductImage {
    id: number;
    image_path: string;
    alt_text?: string;
    is_primary: boolean;
}

interface Props {
    cartItems: CartItem[];
    subtotal: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, subtotal }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const updateQuantity = (cartItemId: number, quantity: number) => {
        router.put(`/cart/${cartItemId}`, { quantity }, {
            preserveScroll: true,
        });
    };

    const removeItem = (cartItemId: number) => {
        if (confirm('Remove this item from your cart?')) {
            router.delete(`/cart/${cartItemId}`, {
                preserveScroll: true,
            });
        }
    };

    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal >= 100000 ? 0 : 15000; // Free shipping over 100k
    const total = subtotal + tax + shipping;

    return (
        <StoreLayout>
            <Head title="Shopping Cart - UMKM Store" />
            
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 Shopping Cart</h1>

                    {cartItems.length > 0 ? (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                            Items ({cartItems.length})
                                        </h2>
                                        
                                        <div className="space-y-4">
                                            {cartItems.map((item) => {
                                                const primaryImage = item.product.images.find(img => img.is_primary) || item.product.images[0];
                                                const currentPrice = item.product.sale_price || item.product.price;
                                                const itemTotal = currentPrice * item.quantity;

                                                return (
                                                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                                        {/* Product Image */}
                                                        <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
                                                            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                                                                {primaryImage ? (
                                                                    <img
                                                                        src={primaryImage.image_path}
                                                                        alt={primaryImage.alt_text || item.product.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                        <span className="text-2xl">📦</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Link>

                                                        {/* Product Info */}
                                                        <div className="flex-1">
                                                            <Link 
                                                                href={`/products/${item.product.slug}`}
                                                                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                                            >
                                                                {item.product.name}
                                                            </Link>
                                                            <p className="text-blue-600 font-semibold">
                                                                {formatPrice(currentPrice)} each
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Stock: {item.product.stock_quantity} available
                                                            </p>
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-12 text-center font-semibold">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.min(item.product.stock_quantity, item.quantity + 1))}
                                                                disabled={item.quantity >= item.product.stock_quantity}
                                                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        {/* Item Total */}
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-gray-900">
                                                                {formatPrice(itemTotal)}
                                                            </p>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-red-600 hover:text-red-700 text-sm mt-1 transition-colors"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-semibold">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax (10%):</span>
                                            <span className="font-semibold">{formatPrice(tax)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-semibold">
                                                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                            </span>
                                        </div>
                                        {subtotal < 100000 && (
                                            <p className="text-sm text-gray-600">
                                                💡 Free shipping on orders over {formatPrice(100000)}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="border-t pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold">Total:</span>
                                            <span className="text-xl font-bold text-blue-600">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                                        🚀 Proceed to Checkout
                                    </button>

                                    <Link
                                        href="/products"
                                        className="block w-full text-center border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Empty Cart */
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🛒</div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                            <p className="text-gray-600 mb-8">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link
                                href="/products"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                            >
                                Start Shopping 🛍️
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </StoreLayout>
    );
}