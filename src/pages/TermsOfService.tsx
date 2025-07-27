
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, CreditCard, Truck, RefreshCw, Mail, Phone } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-maroon text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-maroon-light max-w-2xl mx-auto">
              Please read these terms carefully before using our website and services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Agreement to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using Welkin Pharma's website and services, you accept and agree to 
                be bound by the terms and provision of this agreement. If you do not agree to abide 
                by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Effective Date:</strong> January 2025<br/>
                <strong>Last Updated:</strong> January 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Definitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">"Company" or "We"</h4>
                  <p className="text-muted-foreground">
                    Refers to Welkin Pharma, the owner and operator of this website.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-maroon mb-2">"User" or "You"</h4>
                  <p className="text-muted-foreground">
                    Refers to any individual who accesses or uses our website and services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-maroon mb-2">"Services"</h4>
                  <p className="text-muted-foreground">
                    Includes our website, products, customer support, and all related services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Use of Website</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Permitted Use</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Browse and purchase products for personal use</li>
                    <li>• Create and maintain a user account</li>
                    <li>• Access customer support services</li>
                    <li>• Share product reviews and feedback</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Prohibited Activities</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Using the website for illegal or unauthorized purposes</li>
                    <li>• Attempting to gain unauthorized access to our systems</li>
                    <li>• Posting false, misleading, or defamatory content</li>
                    <li>• Violating any applicable laws or regulations</li>
                    <li>• Engaging in fraudulent activities</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Account Responsibility</h4>
                  <p className="text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account 
                    information and for all activities that occur under your account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Orders & Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Order Acceptance</h4>
                  <p className="text-muted-foreground">
                    All orders are subject to acceptance and availability. We reserve the right 
                    to refuse or cancel orders at our discretion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Pricing</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• All prices are in Indian Rupees (INR)</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• Additional charges may apply for shipping and taxes</li>
                    <li>• Promotional offers are subject to terms and conditions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Payment</h4>
                  <p className="text-muted-foreground">
                    Payment must be made in full at the time of order placement. We accept 
                    various payment methods including credit cards, debit cards, and digital wallets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Delivery Terms</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Delivery times are estimates and not guaranteed</li>
                    <li>• Risk of loss passes to you upon delivery</li>
                    <li>• You must inspect products upon delivery</li>
                    <li>• Shipping costs are non-refundable</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Delivery Issues</h4>
                  <p className="text-muted-foreground">
                    If you experience any issues with delivery, please contact us within 48 hours 
                    of the expected delivery date.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <RefreshCw className="h-5 w-5 mr-2" />
                Returns & Refunds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Return Policy</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Returns accepted within 7 days of delivery</li>
                    <li>• Products must be unopened and in original packaging</li>
                    <li>• Original receipt or proof of purchase required</li>
                    <li>• Return shipping costs are customer's responsibility</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Refund Process</h4>
                  <p className="text-muted-foreground">
                    Approved refunds will be processed within 7-10 business days to the original 
                    payment method. Processing times may vary by payment provider.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Non-Returnable Items</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Opened skincare products for hygiene reasons</li>
                    <li>• Personalized or custom products</li>
                    <li>• Products damaged by misuse</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Accuracy</h4>
                  <p className="text-muted-foreground">
                    We strive to provide accurate product information, but we do not warrant 
                    that descriptions or other content is error-free, complete, or current.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Medical Advice</h4>
                  <p className="text-muted-foreground">
                    Product information is for educational purposes only and should not replace 
                    professional medical advice. Consult a healthcare provider before use.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Allergies & Sensitivities</h4>
                  <p className="text-muted-foreground">
                    Always check ingredient lists and perform patch tests before using new products. 
                    We are not responsible for allergic reactions or sensitivities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, Welkin Pharma shall not be liable for 
                  any indirect, incidental, special, or consequential damages arising from the 
                  use of our website or products.
                </p>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Maximum Liability</h4>
                  <p className="text-muted-foreground">
                    Our total liability for any claim shall not exceed the amount you paid for 
                    the specific product or service giving rise to the claim.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Force Majeure</h4>
                  <p className="text-muted-foreground">
                    We are not responsible for delays or failures in performance resulting from 
                    acts beyond our reasonable control, including natural disasters, war, terrorism, 
                    or government actions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  All content on this website, including text, images, logos, and trademarks, 
                  is the property of Welkin Pharma and is protected by intellectual property laws.
                </p>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">User Content</h4>
                  <p className="text-muted-foreground">
                    By submitting content (reviews, comments, etc.), you grant us a non-exclusive, 
                    royalty-free license to use, modify, and display such content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the website constitutes acceptance 
                of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Bhopal, 
                Madhya Pradesh.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-maroon" /> welkin.pharma@gmail.com</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-maroon" /> +91 7000060407</p>
                <p className="flex items-start">
                  <span className="text-maroon mr-2">📍</span>
                  19, Hussain Building, Ist Floor Old Saifia College Road, Bhopal-462001
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
