import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, Shield, Clock, MapPin, Phone, Mail } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-maroon text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Information</h1>
            <p className="text-lg text-maroon-light max-w-2xl mx-auto">
              Fast, secure, and reliable delivery of your skincare essentials
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-maroon/20">
            <CardHeader className="text-center">
              <div className="bg-maroon/10 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Truck className="h-8 w-8 text-maroon" />
              </div>
              <CardTitle className="text-maroon">Free Shipping</CardTitle>
              <CardDescription>On orders above ₹499</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-maroon/20">
            <CardHeader className="text-center">
              <div className="bg-maroon/10 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Clock className="h-8 w-8 text-maroon" />
              </div>
              <CardTitle className="text-maroon">Fast Delivery</CardTitle>
              <CardDescription>2-5 business days</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-maroon/20">
            <CardHeader className="text-center">
              <div className="bg-maroon/10 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Shield className="h-8 w-8 text-maroon" />
              </div>
              <CardTitle className="text-maroon">Secure Packaging</CardTitle>
              <CardDescription>Safe & hygienic delivery</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Shipping Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Standard Delivery</span>
                  <div className="text-right">
                    <Badge variant="outline" className="text-maroon border-maroon">₹49</Badge>
                    <p className="text-sm text-muted-foreground">2-5 business days</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Express Delivery</span>
                  <div className="text-right">
                    <Badge variant="outline" className="text-maroon border-maroon">₹99</Badge>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Free Shipping</span>
                  <div className="text-right">
                    <Badge className="bg-maroon text-background">Free</Badge>
                    <p className="text-sm text-muted-foreground">Orders above ₹499</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-maroon flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-maroon mb-2">Pan India Delivery</h4>
                    <p className="text-muted-foreground">
                      We deliver to all major cities and towns across India including:
                    </p>
                    <ul className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-1">
                      <li>• Mumbai</li>
                      <li>• Delhi</li>
                      <li>• Bangalore</li>
                      <li>• Chennai</li>
                      <li>• Kolkata</li>
                      <li>• Hyderabad</li>
                      <li>• Pune</li>
                      <li>• Ahmedabad</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-maroon mb-2">Remote Areas</h4>
                    <p className="text-muted-foreground text-sm">
                      Delivery to remote areas may take 1-2 additional business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Order Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-maroon text-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Order Confirmation</h4>
                      <p className="text-muted-foreground text-sm">Orders are processed within 24 hours of confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-maroon text-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Quality Check</h4>
                      <p className="text-muted-foreground text-sm">Each product undergoes quality verification</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-maroon text-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Secure Packaging</h4>
                      <p className="text-muted-foreground text-sm">Products are securely packaged to prevent damage</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-maroon text-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Dispatch</h4>
                      <p className="text-muted-foreground text-sm">Order is dispatched with tracking details</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-maroon">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Orders placed before 2 PM are processed the same day</li>
                  <li>• Weekend orders are processed on the next business day</li>
                  <li>• Track your order using the tracking ID sent via SMS/Email</li>
                  <li>• COD available for orders under ₹2000</li>
                  <li>• Free returns within 7 days of delivery</li>
                  <li>• Products must be unopened and in original packaging</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-maroon flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For any shipping-related queries, contact our customer support:
                </p>
                <div className="space-y-2">
                  <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-maroon" /> +91 7000060407</p>
                  <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-maroon" /> welkin.pharma@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
