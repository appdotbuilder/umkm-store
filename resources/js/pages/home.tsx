import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { StoreLayout } from '@/components/store-layout';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    short_description?: string;
    is_featured: boolean;
    images: ProductImage[];
    category: Category;
}

interface ProductImage {
    id: number;
    image_path: string;
    alt_text?: string;
    is_primary: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image_path?: string;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    newProducts: Product[];
    [key: string]: unknown;
}

export default function Home({ featuredProducts, categories, newProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const ProductCard = ({ product }: { product: Product }) => {
        const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
        const currentPrice = product.sale_price || product.price;
        const isOnSale = product.sale_price && product.sale_price < product.price;

        return (
            <Link href={`/products/${product.slug}`} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                        {primaryImage ? (
                            <img
                                src={primaryImage.image_path}
                                alt={primaryImage.alt_text || product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-4xl">📦</span>
                            </div>
                        )}
                        {isOnSale && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                SALE
                            </div>
                        )}
                        {product.is_featured && (
                            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                ⭐ FEATURED
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600">
                                {formatPrice(currentPrice)}
                            </span>
                            {isOnSale && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    const CategoryCard = ({ category }: { category: Category }) => (
        <Link href={`/products?category=${category.slug}`} className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                    {category.image_path ? (
                        <img
                            src={category.image_path}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-400">
                            <span className="text-4xl">🏷️</span>
                        </div>
                    )}
                </div>
                <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                    </h3>
                </div>
            </div>
        </Link>
    );

    return (
        <StoreLayout>
            <Head title="UMKM Online Store" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                🛍️ Welcome to Our Store
                            </h1>
                            <p className="text-xl mb-8 opacity-90">
                                Discover amazing products from local UMKM businesses
                            </p>
                            <Link
                                href="/products"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
                            >
                                Browse All Products 🔍
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Categories Section */}
                    {categories.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">🏷️ Shop by Category</h2>
                                <Link
                                    href="/products"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                {categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Featured Products */}
                    {featuredProducts.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">⭐ Featured Products</h2>
                                <Link
                                    href="/products?featured=1"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* New Products */}
                    {newProducts.length > 0 && (
                        <section className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">🆕 New Arrivals</h2>
                                <Link
                                    href="/products?sort=created_at&order=desc"
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {newProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Empty State */}
                    {featuredProducts.length === 0 && newProducts.length === 0 && categories.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏪</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Store Coming Soon</h3>
                            <p className="text-gray-600 mb-6">
                                We're setting up our products. Check back soon for amazing deals!
                            </p>
                            <Link
                                href="/products"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                </div>

                {/* Newsletter/CTA Section */}
                <div className="bg-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">📧 Stay Updated</h2>
                            <p className="text-xl mb-8 opacity-90">
                                Get notified about new products and special offers
                            </p>
                            <div className="max-w-md mx-auto">
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                                    />
                                    <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}