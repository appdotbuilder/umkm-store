import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface StoreLayoutProps {
    children: React.ReactNode;
}

export function StoreLayout({ children }: StoreLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl">🛒</span>
                            <span className="text-xl font-bold text-blue-600">UMKM Store</span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link
                                href="/store"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                            >
                                Products
                            </Link>
                            {auth.user && (
                                <Link
                                    href="/cart"
                                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"
                                >
                                    <span>🛒</span>
                                    <span>Cart</span>
                                </Link>
                            )}
                        </nav>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">Welcome, {auth.user.name}</span>
                                    <Link
                                        href={auth.user.role === 'customer' ? '/dashboard' : '/admin/dashboard'}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {auth.user.role === 'customer' ? 'My Account' : 'Admin'}
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="text-gray-600 hover:text-red-600 transition-colors"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2">
                            <span className="text-2xl">☰</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🛒</span>
                                <span className="text-xl font-bold">UMKM Store</span>
                            </div>
                            <p className="text-gray-400">
                                Supporting local Indonesian UMKM businesses with our e-commerce platform.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                                <li><Link href="/products?featured=1" className="hover:text-white transition-colors">Featured</Link></li>
                                <li><Link href="/products?sort=created_at&order=desc" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>📞 +62 123 456 7890</li>
                                <li>📧 info@umkmstore.com</li>
                                <li>🕒 Mon-Fri 9AM-6PM</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-gray-700 px-2 py-1 rounded text-sm">🏦 Bank Transfer</span>
                                <span className="bg-gray-700 px-2 py-1 rounded text-sm">💵 COD</span>
                                <span className="bg-gray-700 px-2 py-1 rounded text-sm">📱 E-Wallet</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
                        <p>&copy; 2024 UMKM Store. Built with ❤️ for Indonesian entrepreneurs.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}