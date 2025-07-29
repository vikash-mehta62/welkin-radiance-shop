
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Users, 
  Shield, 
  CheckCircle, 
  Star,
  Calendar,
  Video,
  MessageCircle,
  Award,
  Heart
} from "lucide-react";

const VideoConsult = () => {
  const [selectedPackage, setSelectedPackage] = useState("single");
  const { addItem } = useCart();
  const { toast } = useToast();

  const packages = {
    single: {
      id: "video-consult-single",
      title: "Single Video Consultation",
      price: 899,
      originalPrice: 1199,
      duration: "30 minutes",
      sessions: 1,
      features: [
        "One-on-one video consultation",
        "Personalized skin analysis",
        "Treatment recommendations",
        "Prescription if required",
        "Follow-up chat support for 7 days"
      ]
    },
    package: {
      id: "video-consult-package",
      title: "Complete Care Package",
      price: 2299,
      originalPrice: 2999,
      duration: "30 minutes each",
      sessions: 3,
      features: [
        "3 video consultations over 3 months",
        "Comprehensive skin assessment",
        "Customized treatment plan",
        "Progress tracking",
        "Unlimited chat support",
        "Priority booking"
      ]
    }
  };

  const currentPackage = packages[selectedPackage];
  const discount = Math.round(((currentPackage.originalPrice - currentPackage.price) / currentPackage.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem({
      id: currentPackage.id,
      slug: "video-consultation",
      title: currentPackage.title,
      price: currentPackage.price,
      image: "/derma.jpg"
    });
    
    toast({
      title: "Added to Cart!",
      description: `${currentPackage.title} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout or cart
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sage-light/10 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-maroon text-background">
            Video Consultation
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Consult with Skin & Hair Specialists
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get expert dermatological advice from certified specialists through secure video consultations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Consultation Details */}
          <div className="space-y-6">
            <Card className="border-sage-light/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Video className="h-6 w-6 text-maroon" />
                  Video Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-maroon" />
                    <span className="text-sm">Duration: {currentPackage.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-maroon" />
                    <span className="text-sm">Sessions: {currentPackage.sessions}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What's Included:</h4>
                  {currentPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="border-sage-light/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Why Choose Our Specialists?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-maroon mt-1" />
                    <div>
                      <h5 className="font-medium text-foreground">Certified Dermatologists</h5>
                      <p className="text-sm text-muted-foreground">Board-certified specialists with 10+ years experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-maroon mt-1" />
                    <div>
                      <h5 className="font-medium text-foreground">100% Secure & Private</h5>
                      <p className="text-sm text-muted-foreground">HIPAA compliant platform with encrypted sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-maroon mt-1" />
                    <div>
                      <h5 className="font-medium text-foreground">Follow-up Support</h5>
                      <p className="text-sm text-muted-foreground">Continued care through chat support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking & Pricing */}
          <div className="space-y-6">
            {/* Package Selection */}
            <Card className="border-sage-light/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Choose Your Package</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(packages).map(([key, pkg]) => {
                    const pkgDiscount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
                    return (
                      <div
                        key={key}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPackage === key
                            ? "border-maroon bg-maroon/5"
                            : "border-sage-light hover:border-maroon/50"
                        }`}
                        onClick={() => setSelectedPackage(key)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-foreground">{pkg.title}</h4>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {pkgDiscount}% OFF
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-bold text-maroon">₹{pkg.price}</span>
                          <span className="text-lg text-muted-foreground line-through">₹{pkg.originalPrice}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pkg.sessions} session{pkg.sessions > 1 ? 's' : ''} • {pkg.duration}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Booking Card */}
            <Card className="border-sage-light/50 shadow-elegant sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{currentPackage.title}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-maroon">₹{currentPackage.price}</span>
                    <span className="text-xl text-muted-foreground line-through">₹{currentPackage.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Save {discount}% • ₹{currentPackage.originalPrice - currentPackage.price} OFF
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-background"
                    onClick={handleBuyNow}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-maroon text-maroon hover:bg-maroon hover:text-background"
                    onClick={handleAddToCart}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-sage-light/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">Highly Rated</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    4.8/5 rating from 500+ consultations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Book Consultation",
                description: "Choose your package and book a convenient time slot",
                icon: Calendar
              },
              {
                step: 2,
                title: "Video Call",
                description: "Connect with our dermatologist via secure video call",
                icon: Video
              },
              {
                step: 3,
                title: "Get Treatment Plan",
                description: "Receive personalized recommendations and prescriptions",
                icon: CheckCircle
              }
            ].map((item) => (
              <Card key={item.step} className="text-center border-sage-light/50">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsult;
