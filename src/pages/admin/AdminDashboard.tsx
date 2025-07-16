
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { products, orders, users } = useAdmin();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const activeUsers = users.filter(user => user.status === 'active').length;

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-sage-dark",
      bgColor: "bg-sage-light/30",
      borderColor: "border-sage-light",
      change: "+12%",
      trending: "up"
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      change: "+23%",
      trending: "up"
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: Users,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      change: "+8%",
      trending: "up"
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      change: "+15%",
      trending: "up"
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/admin/products/create">
            <Button variant="luxury" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              <Package className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className={`${stat.borderColor} border-2 hover:shadow-elegant transition-all duration-300 hover:scale-105`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="flex items-center text-sm">
                {stat.trending === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`font-medium ${stat.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders - Takes 2/3 of the space */}
        <Card className="lg:col-span-2 border-sage-light/50 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-foreground">Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest customer orders</p>
            </div>
            <Link to="/admin/orders">
              <Button variant="outline" size="sm" className="border-sage-light hover:bg-sage-light/20">
                View All Orders
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-sage-light/10 rounded-lg hover:bg-sage-light/20 transition-colors border border-sage-light/30">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">#{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">₹{order.total.toLocaleString()}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700 border border-green-200' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions - Takes 1/3 of the space */}
        <Card className="border-sage-light/50 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Manage your store efficiently</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <Link to="/admin/products/create" className="block">
              <Button variant="outline" className="w-full justify-start h-12 border-sage-light hover:bg-sage-light/20 hover:border-sage transition-all">
                <Package className="h-5 w-5 mr-3 text-sage-dark" />
                <div className="text-left">
                  <div className="font-medium">Add New Product</div>
                  <div className="text-xs text-muted-foreground">Create skincare products</div>
                </div>
              </Button>
            </Link>
            <Link to="/admin/orders" className="block">
              <Button variant="outline" className="w-full justify-start h-12 border-sage-light hover:bg-sage-light/20 hover:border-sage transition-all">
                <ShoppingCart className="h-5 w-5 mr-3 text-sage-dark" />
                <div className="text-left">
                  <div className="font-medium">View Orders</div>
                  <div className="text-xs text-muted-foreground">Manage customer orders</div>
                </div>
              </Button>
            </Link>
            <Link to="/admin/users" className="block">
              <Button variant="outline" className="w-full justify-start h-12 border-sage-light hover:bg-sage-light/20 hover:border-sage transition-all">
                <Users className="h-5 w-5 mr-3 text-sage-dark" />
                <div className="text-left">
                  <div className="font-medium">Manage Users</div>
                  <div className="text-xs text-muted-foreground">View customer accounts</div>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
