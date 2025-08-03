import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        category?: string;
        search?: string;
        min_price?: number;
        max_price?: number;
        sort?: string;
        order?: string;
    };
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [sortBy, setSortBy] = useState(filters.sort || 'created_at');
    const [sortOrder, setSortOrder] = useState(filters.order || 'desc');

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchTerm });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        applyFilters({ category });
    };

    const handleSortChange = (sort: string, order: string) => {
        setSortBy(sort);
        setSortOrder(order);
        applyFilters({ sort, order });
    };

    const applyFilters = (newFilters: Record<string, string | number | undefined>) => {
        const params = { ...filters, ...newFilters };
        // Remove empty values
        Object.keys(params).forEach(key => {
            const value = params[key as keyof typeof params];
            if (value === '' || value === null || value === undefined) {
                delete params[key as keyof typeof params];
            }
        });
        
        router.get('/products', params, { preserveState: true });
    };

    const ProductCard = ({ product }: { product: Product }) => {
        const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
        const currentPrice = product.sale_price || product.price;
        const isOnSale = product.sale_price && product.sale_price < product.price;

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                <Link href={`/products/${product.slug}`}>
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
                                ⭐
                            </div>
                        )}
                    </div>
                </Link>
                
                <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.category.name}</p>
                    {product.short_description && (
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.short_description}</p>
                    )}
                    <div className="flex items-center justify-between">
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
                        <Link
                            href={`/products/${product.slug}`}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <StoreLayout>
            <Head title="Products - UMKM Store" />
            
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">🛍️ All Products</h1>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                                >
                                    🔍 Search
                                </button>
                            </div>
                        </form>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {/* Sort Options */}
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [sort, order] = e.target.value.split('-');
                                    handleSortChange(sort, order);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="created_at-desc">Newest First</option>
                                <option value="created_at-asc">Oldest First</option>
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                                <option value="price-asc">Price Low to High</option>
                                <option value="price-desc">Price High to Low</option>
                            </select>

                            {/* Clear Filters */}
                            {(filters.category || filters.search || filters.sort !== 'created_at' || filters.order !== 'desc') && (
                                <button
                                    onClick={() => router.get('/products')}
                                    className="text-red-600 hover:text-red-700 underline text-sm"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results Info */}
                    <div className="mb-6 text-gray-600">
                        Showing {products.data.length} of {products.total} products
                        {filters.category && (
                            <span> in category "{categories.find(c => c.slug === filters.category)?.name}"</span>
                        )}
                        {filters.search && (
                            <span> for "{filters.search}"</span>
                        )}
                    </div>

                    {/* Products Grid */}
                    {products.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex justify-center">
                                    <div className="flex space-x-2">
                                        {products.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    if (link.url) {
                                                        const url = new URL(link.url);
                                                        const page = url.searchParams.get('page');
                                                        applyFilters({ ...filters, page: page || undefined });
                                                    }
                                                }}
                                                disabled={!link.url}
                                                className={`px-3 py-2 rounded ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-600 mb-6">
                                {filters.search || filters.category
                                    ? "Try adjusting your search criteria or browse all products."
                                    : "No products are available at the moment."}
                            </p>
                            {(filters.search || filters.category) && (
                                <button
                                    onClick={() => router.get('/products')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View All Products
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </StoreLayout>
    );
}