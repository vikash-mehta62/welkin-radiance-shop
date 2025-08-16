import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/contexts/AdminContext";
import { Eye, Package, Calendar, User, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getUserOrderApi } from "@/services2/operations/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { user, token } = useSelector((state: RootState) => state.auth);

  const fetchOrders = async () => {
    const response = await getUserOrderApi(user._id, token);
    setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order?.orderStatus === statusFilter);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
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
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Order Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage customer orders
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order?._id} className="border-sage-light/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">#{order?._id}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(order?.createdAt)}
                    </p>
                  </div>
                  <Badge className={getStatusBadgeColor(order?.orderStatus)}>
                    {order?.orderStatus?.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{order?.totalPrice?.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order?.orderItems?.length} items
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-sage mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Customer</h4>
                    <p className="text-sm text-muted-foreground">
                      {order?.user?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order?.user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-sage mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Items</h4>
                    {order?.orderItems?.slice(0, 2).map((item, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {item?.product?.title} (x{item?.quantity})
                      </p>
                    ))}
                    {order?.orderItems?.length > 2 && (
                      <p className="text-sm text-muted-foreground">
                        +{order?.orderItems?.length - 2} more
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-sage mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground">Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      {order?.shippingInfo?.city}, {order?.shippingInfo?.state}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order?.shippingInfo?.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-sage-light/30">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Order Details - #{order?.order_id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Customer Information */}
                      <div>
                        <h3 className="font-semibold mb-3">
                          Customer Information
                        </h3>
                        <div className="bg-sage-light/10 p-4 rounded-lg">
                          <p>
                            <strong>Name:</strong> {order?.user?.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {order?.user?.email}
                          </p>
                          <p>
                            <strong>Order Date:</strong>{" "}
                            {formatDate(order?.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold mb-3">Shipping Address</h3>
                        <div className="bg-sage-light/10 p-4 rounded-lg">
                          <p>{order?.shippingInfo?.address}</p>
                          <p>
                            {order?.shippingInfo?.city},{" "}
                            {order?.shippingInfo?.state}{" "}
                            {order?.shippingInfo?.pincode}
                          </p>
                          <p>
                            <strong>Phone:</strong> {order?.user?.phone}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-3">Order Items</h3>
                        <div className="space-y-3">
                          {order?.orderItems?.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-sage-light/10 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">
                                  {item?.product?.title}
                                </p>
                                <p className="text-sm text-muted-foreground flex flex-col">
                                  Quantity: {item?.quantity}
                                <span>
                                    Per Product: ₹{item?.price || item?.product?.sellingPrice} 
                                </span>
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₹
                                {(
                                 item.price || item?.product?.sellingPrice * item?.quantity
                                ).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total Amount:</span>
                          <span className="text-primary">
                            ₹{order?.totalPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="border-sage-light/50">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No orders found
            </h3>
            <p className="text-muted-foreground">
              {statusFilter === "all"
                ? "No orders have been placed yet."
                : `No ${statusFilter} orders found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserOrder;
