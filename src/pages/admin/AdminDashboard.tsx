import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
} from "lucide-react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrder } from "@/services2/operations/order";
import { getAllDashboardDataAPI } from "@/services2/operations/dashboard";
import { Link } from "react-router-dom";
// Types based on your API response
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  type: string;
  category: string[];
  mrp: number;
  sellingPrice: number;
  images: string[];
}

interface OrderItem {
  product: Product;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  order_id: string;
  user: User;
  orderItems: OrderItem[];
  totalPrice: string;
  orderStatus: string;
  createdAt: string;
  paidAt: string;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: number;
  };
  paymentInfo: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
  };
}

interface Stat {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  change: string;
  trending: "up" | "down";
}

interface DashboardData {
  orders: Order[];
  stats: Stat[];
}

const getIconComponent = (iconName: string) => {
  const icons = {
    Package,
    ShoppingCart,
    Users,
    TrendingUp,
  };
  return icons[iconName as keyof typeof icons] || Package;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "pending":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function AdminDashboard() {
  // const { orders, stats } = mockData;

  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([]);
  const { token } = useSelector((state: RootState) => state.auth);

  const fetchOrders = async () => {
    const response = await getAllOrder(token);
    setOrders(response);
  };
  const fetchDashboardData = async () => {
    const response = await getAllDashboardDataAPI();
    setStats(response?.stats);
    console.log(response?.stats);
  };

  useEffect(() => {
    fetchOrders();
    fetchDashboardData();
  }, []);
  // Limit to only 3 recent orders
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = getIconComponent(stat.icon);
            return (
              <Card
                key={stat.title}
                className={`${stat.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}
                  >
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-sm">
                    {stat.trending === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={`font-medium ${
                        stat.trending === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders - Takes 2/3 of the space */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Recent Orders
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Latest 3 customer orders
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All Orders
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              #{order.order_id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-bold text-lg text-gray-900">
                          ₹{Number.parseInt(order.totalPrice).toLocaleString()}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium capitalize ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions - Takes 1/3 of the space */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Quick Actions
              </CardTitle>
              <p className="text-sm text-gray-600">
                Manage your store efficiently
              </p>
            </CardHeader>
        <CardContent className="space-y-4 pt-0">
  <Link to="/admin/products">
    <Button
      variant="outline"
      className="w-full justify-start h-12 hover:bg-gray-50 transition-all bg-transparent"
    >
      <Package className="h-5 w-5 mr-3 text-emerald-600" />
      <div className="text-left">
        <div className="font-medium">Add New Product</div>
        <div className="text-xs text-gray-500">
          Create skincare products
        </div>
      </div>
    </Button>
  </Link>

  <Link to="/admin/orders">
    <Button
      variant="outline"
      className="w-full justify-start h-12 hover:bg-gray-50 transition-all bg-transparent"
    >
      <ShoppingCart className="h-5 w-5 mr-3 text-blue-600" />
      <div className="text-left">
        <div className="font-medium">View Orders</div>
        <div className="text-xs text-gray-500">
          Manage customer orders
        </div>
      </div>
    </Button>
  </Link>

  <Link to="/admin/users">
    <Button
      variant="outline"
      className="w-full justify-start h-12 hover:bg-gray-50 transition-all bg-transparent"
    >
      <Users className="h-5 w-5 mr-3 text-purple-600" />
      <div className="text-left">
        <div className="font-medium">Manage Users</div>
        <div className="text-xs text-gray-500">
          View customer accounts
        </div>
      </div>
    </Button>
  </Link>
</CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
