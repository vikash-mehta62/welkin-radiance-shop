import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  CreditCard,
  Settings,
} from "lucide-react";
import { getUserAPI } from "@/services2/operations/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserOrder from "./UserOrder";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const authData = useSelector((state: RootState) => state.auth);

  console.log(authData);
  // Mock user data
  const user = {
    name: authData.user.name,
    email: authData.user.email,
    phone: `+91 ${authData.user.phone}`,
    dateJoined: new Date(authData.user.createdAt).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }),
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      authData.user.name
    )}&background=random`,
    addresses: [
      {
        id: "1",
        type: "Home",
        name: " Johnson",
        street: "123 Green Valley Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        isDefault: true,
      },
      {
        id: "2",
        type: "Office",
        name: "  Johnson",
        street: "456 Business District",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400002",
        isDefault: false,
      },
    ],
  };

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: 2299,
      items: [
        { name: "Brightening Vitamin C Serum", quantity: 1, price: 999 },
        { name: "Hydrating Hyaluronic Moisturizer", quantity: 1, price: 699 },
        { name: "Gentle Foaming Cleanser", quantity: 1, price: 449 },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "Nov 28, 2024",
      status: "Processing",
      total: 1648,
      items: [
        { name: "Retinol Night Serum", quantity: 1, price: 1199 },
        { name: "Daily Protection Sunscreen SPF 50", quantity: 1, price: 549 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 border-sage-light/50 shadow-soft">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {user.name}
                </h1>
                <p className="text-muted-foreground mb-4">
                  Member since {user.dateJoined}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Profile Information */}
          <TabsContent value="profile">
            <Card className="border-sage-light/50 shadow-soft">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input disabled id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      disabled
                      id="email"
                      type="email"
                      defaultValue={user.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input disabled id="phone" defaultValue={user.phone} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History */}
          <TabsContent value="orders">
            <UserOrder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
