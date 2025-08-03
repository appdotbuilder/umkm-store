import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    totalRevenue: number;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    items: OrderItem[];
}

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
}

interface MonthlySale {
    month: number;
    total: number;
}

interface BestSellingProduct {
    id: number;
    name: string;
    total_sold: number;
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    monthlySales: MonthlySale[];
    bestSellingProducts: BestSellingProduct[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentOrders, monthlySales, bestSellingProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            processing: 'bg-orange-100 text-orange-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return (
        <AppShell>
            <Head title="Admin Dashboard - UMKM Store" />
            
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">📊 Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Welcome to your store management center</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">📦</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">👥</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">🛍️</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-3xl">💰</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">📋 Recent Orders</h2>
                                    <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View All →
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-gray-900">#{order.order_number}</p>
                                                    <p className="text-sm text-gray-600">{order.user.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        {formatPrice(order.total_amount)}
                                                    </p>
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No recent orders</p>
                                )}
                            </div>
                        </div>

                        {/* Best Selling Products */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">🏆 Best Selling Products</h2>
                                    <Link href="/admin/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        View Reports →
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {bestSellingProducts.length > 0 ? (
                                    <div className="space-y-4">
                                        {bestSellingProducts.map((product, index) => (
                                            <div key={product.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-gray-900">{product.name}</span>
                                                </div>
                                                <span className="text-sm text-gray-600">{product.total_sold} sold</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No sales data available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Monthly Sales Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">📈 Monthly Sales</h2>
                        </div>
                        <div className="p-6">
                            {monthlySales.length > 0 ? (
                                <div className="space-y-4">
                                    {monthlySales.map((sale) => (
                                        <div key={sale.month} className="flex items-center justify-between">
                                            <span className="text-gray-600">{monthNames[sale.month - 1]} 2024</span>
                                            <span className="font-semibold text-gray-900">{formatPrice(sale.total)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No sales data available</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">⚡ Quick Actions</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid md:grid-cols-3 gap-4">
                                <Link
                                    href="/admin/products/create"
                                    className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                                >
                                    <span className="text-2xl mr-2">➕</span>
                                    <span className="font-medium text-blue-700">Add Product</span>
                                </Link>
                                <Link
                                    href="/admin/orders"
                                    className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                                >
                                    <span className="text-2xl mr-2">📦</span>
                                    <span className="font-medium text-green-700">Manage Orders</span>
                                </Link>
                                <Link
                                    href="/admin/coupons/create"
                                    className="flex items-center justify-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
                                >
                                    <span className="text-2xl mr-2">🎫</span>
                                    <span className="font-medium text-purple-700">Create Coupon</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}