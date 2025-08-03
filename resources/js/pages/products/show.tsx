import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { StoreLayout } from '@/components/store-layout';
import { type SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description?: string;
    short_description?: string;
    price: number;
    sale_price?: number;
    stock_quantity: number;
    in_stock: boolean;
    is_featured: boolean;
    weight?: number;
    dimensions?: string;
    images: ProductImage[];
    category: Category;
}

interface ProductImage {
    id: number;
    image_path: string;
    alt_text?: string;
    is_primary: boolean;
    sort_order: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const currentPrice = product.sale_price || product.price;
    const isOnSale = product.sale_price && product.sale_price < product.price;
    const discountPercentage = isOnSale 
        ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
        : 0;

    const handleAddToCart = async () => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        setIsAddingToCart(true);
        
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
        }, {
            onFinish: () => setIsAddingToCart(false),
        });
    };

    const ProductCard = ({ product: relatedProduct }: { product: Product }) => {
        const primaryImage = relatedProduct.images.find(img => img.is_primary) || relatedProduct.images[0];
        const relatedCurrentPrice = relatedProduct.sale_price || relatedProduct.price;
        const relatedIsOnSale = relatedProduct.sale_price && relatedProduct.sale_price < relatedProduct.price;

        return (
            <Link href={`/products/${relatedProduct.slug}`} className="group">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                        {primaryImage ? (
                            <img
                                src={primaryImage.image_path}
                                alt={primaryImage.alt_text || relatedProduct.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span className="text-4xl">📦</span>
                            </div>
                        )}
                        {relatedIsOnSale && (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                SALE
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedProduct.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600">
                                {formatPrice(relatedCurrentPrice)}
                            </span>
                            {relatedIsOnSale && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(relatedProduct.price)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <StoreLayout>
            <Head title={`${product.name} - UMKM Store`} />
            
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-blue-600">Home</Link>
                            <span>›</span>
                            <Link href="/products" className="hover:text-blue-600">Products</Link>
                            <span>›</span>
                            <Link href={`/products?category=${product.category.slug}`} className="hover:text-blue-600">
                                {product.category.name}
                            </Link>
                            <span>›</span>
                            <span className="text-gray-900">{product.name}</span>
                        </div>
                    </nav>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Product Images */}
                        <div>
                            {/* Main Image */}
                            <div className="aspect-square mb-4 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                {product.images.length > 0 ? (
                                    <img
                                        src={product.images[selectedImage]?.image_path}
                                        alt={product.images[selectedImage]?.alt_text || product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-6xl">📦</span>
                                    </div>
                                )}
                            </div>

                            {/* Image Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                                selectedImage === index
                                                    ? 'border-blue-600'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                src={image.image_path}
                                                alt={image.alt_text || product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                {/* Product Title & Category */}
                                <div className="mb-4">
                                    <Link 
                                        href={`/products?category=${product.category.slug}`}
                                        className="text-sm text-blue-600 hover:text-blue-700 mb-2 inline-block"
                                    >
                                        {product.category.name}
                                    </Link>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                    <p className="text-gray-600">SKU: {product.sku}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-3xl font-bold text-blue-600">
                                            {formatPrice(currentPrice)}
                                        </span>
                                        {isOnSale && (
                                            <>
                                                <span className="text-xl text-gray-500 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className="bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                                                    {discountPercentage}% OFF
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    {product.is_featured && (
                                        <span className="bg-yellow-500 text-white px-2 py-1 text-sm font-semibold rounded">
                                            ⭐ Featured Product
                                        </span>
                                    )}
                                </div>

                                {/* Short Description */}
                                {product.short_description && (
                                    <p className="text-gray-700 mb-6">{product.short_description}</p>
                                )}

                                {/* Stock Status */}
                                <div className="mb-6">
                                    {product.in_stock ? (
                                        <div className="flex items-center text-green-600">
                                            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                            <span>In Stock ({product.stock_quantity} available)</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-600">
                                            <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                                            <span>Out of Stock</span>
                                        </div>
                                    )}
                                </div>

                                {/* Add to Cart */}
                                {product.in_stock && (
                                    <div className="mb-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                                Quantity:
                                            </label>
                                            <select
                                                id="quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                {[...Array(Math.min(product.stock_quantity, 10))].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={isAddingToCart}
                                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAddingToCart ? 'Adding...' : '🛒 Add to Cart'}
                                        </button>
                                        
                                        {!auth.user && (
                                            <p className="text-sm text-gray-600 mt-2 text-center">
                                                <Link href="/login" className="text-blue-600 hover:text-blue-700">
                                                    Login
                                                </Link> to add items to cart
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Product Details */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                                    <div className="space-y-2 text-sm">
                                        {product.weight && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Weight:</span>
                                                <span className="text-gray-900">{product.weight} kg</span>
                                            </div>
                                        )}
                                        {product.dimensions && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dimensions:</span>
                                                <span className="text-gray-900">{product.dimensions}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Category:</span>
                                            <span className="text-gray-900">{product.category.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">SKU:</span>
                                            <span className="text-gray-900">{product.sku}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    {product.description && (
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Description</h2>
                            <div className="prose max-w-none text-gray-700">
                                {product.description.split('\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StoreLayout>
    );
}