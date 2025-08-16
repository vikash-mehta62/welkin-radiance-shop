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
import { Eye, Package, Calendar, User, MapPin, IndianRupee, CreditCard, Phone, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  getAllOrder,
  updateOrderStatusApi,
} from "@/services2/operations/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const { updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { token } = useSelector((state: RootState) => state.auth);

  const fetchOrders = async () => {
    const response = await getAllOrder(token);
    setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, orderStatus) => {
    await updateOrderStatusApi(id, orderStatus, token);
    fetchOrders();
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order?.orderStatus === statusFilter);


  console.log(filteredOrders)
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Select
                    value={order?.orderStatus}
                    onValueChange={(value) =>
                      handleStatusUpdate(order._id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ordered">Ordered</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold">
                        Order Details - #{order?.order_id}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-8 h-[90vh] overflow-scroll">
                      {/* Customer Information */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          Customer Information
                        </h3>
                        <div className="bg-muted/40 p-4 rounded-lg space-y-2">
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{order?.user?.email}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{order?.user?.phone}</span>
                          </p>
                          <p>
                            <strong>Order Date:</strong> {formatDate(order?.createdAt)}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="capitalize">{order?.orderStatus}</span>
                          </p>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Shipping Address
                        </h3>
                        <div className="bg-muted/40 p-4 rounded-lg space-y-1">
                          <p>{order?.shippingInfo?.name}</p>
                          <p>{order?.shippingInfo?.address}</p>
                          <p>
                            {order?.shippingInfo?.city}, {order?.shippingInfo?.state} -{" "}
                            {order?.shippingInfo?.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Payment Information
                        </h3>
                        <div className="bg-muted/40 p-4 rounded-lg space-y-2">
                          <p>
                            <strong>Payment ID:</strong>{" "}
                            {order?.paymentInfo?.razorpayPaymentId}
                          </p>
                          <p>
                            <strong>Order ID:</strong> {order?.paymentInfo?.razorpayOrderId}
                          </p>
                          <p>
                            <strong>Paid At:</strong> {formatDate(order?.paidAt)}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4 text-primary" />
                          Order Items
                        </h3>
                        <div className="space-y-3">
                          {order?.orderItems?.map((item: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-muted/40 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{item?.product?.title}</p>
                                <p className="text-sm text-muted-foreground flex flex-col">
                                  Quantity: {item?.quantity}
                                <span>
                                    Per Product: ₹{item?.price || item?.product?.sellingPrice} 
                                </span>
                                </p>
                              </div>
                              <p className="font-semibold flex items-center gap-1">
                                <IndianRupee className="h-4 w-4" />
                                {(Number(item.price || item?.product?.sellingPrice) *
                                  Number(item?.quantity)
                                ).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Total Amount:</span>
                          <span className="text-primary flex items-center gap-1">
                            <IndianRupee className="h-5 w-5" />
                            {Number(order?.totalPrice).toLocaleString()}
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

export default OrderManagement;
