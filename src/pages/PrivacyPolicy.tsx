
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-maroon text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-maroon-light max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At Welkin Pharma, we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you 
                visit our website or use our services. By using our website, you agree to the terms outlined 
                in this Privacy Policy.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Last Updated:</strong> January 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-maroon mb-3">Personal Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Name, email address, and phone number</li>
                  <li>• Shipping and billing addresses</li>
                  <li>• Payment information (processed securely through payment gateways)</li>
                  <li>• Order history and purchase preferences</li>
                  <li>• Account credentials and profile information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-maroon mb-3">Automatically Collected Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• IP address and device information</li>
                  <li>• Browser type and version</li>
                  <li>• Pages visited and time spent on our website</li>
                  <li>• Cookies and similar tracking technologies</li>
                  <li>• Location data (if permitted)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-maroon mb-3">Communication Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Customer support interactions</li>
                  <li>• Feedback and reviews</li>
                  <li>• Newsletter subscriptions</li>
                  <li>• Survey responses</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Users className="h-5 w-5 mr-2" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Order Processing & Fulfillment</h4>
                  <p className="text-muted-foreground">
                    We use your information to process orders, arrange shipping, handle payments, 
                    and provide customer support.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Communication</h4>
                  <p className="text-muted-foreground">
                    To send order confirmations, shipping updates, promotional offers, and respond 
                    to your inquiries.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Personalization</h4>
                  <p className="text-muted-foreground">
                    To provide personalized product recommendations and improve your shopping experience.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Analytics & Improvement</h4>
                  <p className="text-muted-foreground">
                    To analyze website usage, improve our services, and develop new features.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Legal Compliance</h4>
                  <p className="text-muted-foreground">
                    To comply with legal obligations and protect our rights and interests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Security Measures</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing through trusted gateways</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Limited access to personal information</li>
                    <li>• Secure data storage and backup systems</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Data Retention</h4>
                  <p className="text-muted-foreground">
                    We retain your personal information only for as long as necessary to fulfill 
                    the purposes outlined in this policy or as required by law.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Third-Party Sharing</h4>
                  <p className="text-muted-foreground">
                    We do not sell, trade, or rent your personal information to third parties. 
                    We may share information with trusted service providers who assist us in 
                    operating our website and conducting business.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-maroon mb-2">Access & Correction</h4>
                  <p className="text-muted-foreground">
                    You have the right to access, update, or correct your personal information 
                    at any time through your account settings.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Data Portability</h4>
                  <p className="text-muted-foreground">
                    You can request a copy of your personal data in a structured, commonly used format.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Deletion</h4>
                  <p className="text-muted-foreground">
                    You can request the deletion of your personal information, subject to legal 
                    and business requirements.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Opt-Out</h4>
                  <p className="text-muted-foreground">
                    You can unsubscribe from marketing communications at any time by clicking 
                    the unsubscribe link in our emails.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your browsing experience, 
                  analyze site traffic, and personalize content. You can manage cookie preferences 
                  through your browser settings.
                </p>

                <div>
                  <h4 className="font-semibold text-maroon mb-2">Types of Cookies</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Essential cookies for site functionality</li>
                    <li>• Analytics cookies for usage statistics</li>
                    <li>• Preference cookies for user settings</li>
                    <li>• Marketing cookies for targeted advertising</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon">Changes to Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes will be posted 
                on this page with an updated revision date. We encourage you to review this 
                policy periodically to stay informed about how we protect your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-maroon flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or how we handle your 
                personal information, please contact us:
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

export default PrivacyPolicy;
