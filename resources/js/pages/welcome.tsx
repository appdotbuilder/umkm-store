import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome - UMKM Online Store">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-blue-600">🛒 UMKM Store</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/products"
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            Browse Products
                                        </Link>
                                        <Link
                                            href={auth.user.role === 'customer' ? '/dashboard' : '/admin/dashboard'}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            {auth.user.role === 'customer' ? 'My Account' : 'Admin Panel'}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                🏪 Complete Online Store Solution for <span className="text-blue-600">UMKM</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                Empower your small and medium business with our comprehensive e-commerce platform. 
                                Manage products, process orders, and grow your business online.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Start Your Store 🚀
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
                                        >
                                            Browse Demo Store 🛍️
                                        </Link>
                                    </>
                                )}
                                {auth.user && auth.user.role === 'customer' && (
                                    <Link
                                        href="/products"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Start Shopping 🛍️
                                    </Link>
                                )}
                                {auth.user && auth.user.role !== 'customer' && (
                                    <Link
                                        href="/admin/dashboard"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Go to Admin Panel 📊
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {/* Admin Features */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-4">👨‍💼</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Management</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Product & inventory management</li>
                                    <li>• Order processing & tracking</li>
                                    <li>• Customer management</li>
                                    <li>• Sales reports & analytics</li>
                                    <li>• Multi-role permissions</li>
                                </ul>
                            </div>

                            {/* Customer Features */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-4">🛒</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Experience</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Browse product catalog</li>
                                    <li>• Advanced search & filters</li>
                                    <li>• Shopping cart & checkout</li>
                                    <li>• Order tracking</li>
                                    <li>• Account management</li>
                                </ul>
                            </div>

                            {/* Store Features */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                                <div className="text-3xl mb-4">⚙️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Store Configuration</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Store profile & branding</li>
                                    <li>• Payment methods setup</li>
                                    <li>• Shipping configuration</li>
                                    <li>• Coupon & promotions</li>
                                    <li>• Automated notifications</li>
                                </ul>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="bg-white rounded-xl shadow-md p-8 mb-16">
                            <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">💳 Supported Payment Methods</h3>
                            <div className="flex flex-wrap justify-center gap-6">
                                <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                                    <span className="text-2xl">🏦</span>
                                    <span className="font-medium">Bank Transfer</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                                    <span className="text-2xl">💵</span>
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
                                    <span className="text-2xl">📱</span>
                                    <span className="font-medium">E-Wallet</span>
                                </div>
                            </div>
                        </div>

                        {/* User Roles */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white p-8">
                            <h3 className="text-2xl font-semibold text-center mb-6">👥 Multiple User Roles</h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">👑</div>
                                    <div className="font-semibold">Main Admin</div>
                                    <div className="text-sm opacity-90">Full access & control</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">📦</div>
                                    <div className="font-semibold">Warehouse Admin</div>
                                    <div className="text-sm opacity-90">Inventory management</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">💰</div>
                                    <div className="font-semibold">Cashier</div>
                                    <div className="text-sm opacity-90">Order processing</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🛍️</div>
                                    <div className="font-semibold">Customer</div>
                                    <div className="text-sm opacity-90">Shopping experience</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-400">
                            Built with ❤️ for Indonesian UMKM • Powered by Laravel & React
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}