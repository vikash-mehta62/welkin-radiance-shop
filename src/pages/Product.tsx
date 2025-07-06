import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Heart, Share2, Star } from "lucide-react";
import productsGrid from "@/assets/products-grid.jpg";

const Product = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data (in real app, fetch based on slug)
  const product = {
    id: "1",
    slug: "brightening-vitamin-c-serum",
    title: "Brightening Vitamin C Serum",
    mrp: 1299,
    sellingPrice: 999,
    images: [productsGrid, productsGrid, productsGrid, productsGrid],
    category: "Serum",
    type: "Treatment",
    skinSuitability: "All skin types, especially dull and uneven skin tone",
    rating: 4.8,
    reviews: 342,
    keyBenefits: [
      "Brightens and evens skin tone",
      "Reduces appearance of dark spots",
      "Provides antioxidant protection",
      "Boosts collagen production",
      "Improves skin radiance and glow"
    ],
    description: `Our Brightening Vitamin C Serum is a powerful antioxidant treatment designed to illuminate your complexion and combat signs of aging. Formulated with 20% stabilized Vitamin C, this lightweight serum penetrates deep into the skin to deliver transformative results.

This premium serum combines the power of Vitamin C with complementary ingredients like Hyaluronic Acid and Vitamin E to create a comprehensive anti-aging solution. The result is visibly brighter, more even-toned skin with improved texture and luminosity.`,
    ingredients: [
      "20% Stabilized Vitamin C (L-Ascorbic Acid)",
      "Hyaluronic Acid",
      "Vitamin E (Tocopherol)",
      "Ferulic Acid",
      "Niacinamide",
      "Aqua (Water)",
      "Glycerin",
      "Sodium Hyaluronate"
    ],
    howToUse: `Apply 2-3 drops to clean, dry skin every morning. Gently pat and press into skin until fully absorbed. Follow with moisturizer and sunscreen during the day. Start with every other day for the first week to allow skin to adjust, then use daily as tolerated.

For best results, use consistently as part of your morning skincare routine. Store in a cool, dark place to maintain potency.`,
    additionalInfo: [
      {
        title: "Our Promise",
        content: "We're committed to delivering skincare that actually works. Our Vitamin C Serum is backed by clinical testing and made with premium ingredients sourced from trusted suppliers worldwide.",
        image: productsGrid
      },
      {
        title: "Quality Guarantee",
        content: "Every batch is tested for purity and potency. We use dark glass bottles to protect the formula from light degradation, ensuring maximum effectiveness with every use.",
        image: productsGrid
      }
    ],
    faqs: [
      {
        question: "How long will it take to see results?",
        answer: "Most users notice improved skin brightness within 2-3 weeks of consistent use. Significant improvements in dark spots and overall radiance typically appear after 6-8 weeks of regular application."
      },
      {
        question: "Can I use this with other active ingredients?",
        answer: "Yes, but introduce gradually. Avoid using with retinol in the same routine. Can be combined with niacinamide and hyaluronic acid. Always patch test when combining new products."
      },
      {
        question: "Is this suitable for sensitive skin?",
        answer: "Our formula is designed to be gentler than traditional Vitamin C serums, but we recommend starting with every other day application. Always patch test first if you have sensitive skin."
      },
      {
        question: "Why does the color change over time?",
        answer: "Slight color changes are normal with Vitamin C products due to natural oxidation. However, significant darkening indicates the product should be replaced. Store in a cool, dark place to maximize shelf life."
      }
    ]
  };

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-sage-light/20">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary shadow-card' 
                      : 'border-sage-light hover:border-sage'
                  }`}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">{product.type}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted-foreground'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">₹{product.sellingPrice}</span>
              <span className="text-xl text-muted-foreground line-through">₹{product.mrp}</span>
              <Badge className="bg-sage text-background">{discount}% OFF</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Skin Suitability</h3>
                <p className="text-muted-foreground">{product.skinSuitability}</p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="font-semibold text-foreground">Quantity:</label>
                <div className="flex items-center border border-sage-light rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="hero" size="lg" className="flex-1">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="minimal" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="minimal" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Sections */}
        <div className="space-y-8">
          {/* Key Benefits */}
          <Card className="border-sage-light/50 shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Key Benefits</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {product.keyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-sage-light/50 shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Description</h2>
              <div className="prose prose-sage max-w-none">
                {product.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ingredients & How to Use */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-sage-light/50 shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Ingredients</h2>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-muted-foreground">
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-sage-light/50 shadow-soft">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">How to Use</h2>
                <div className="prose prose-sage max-w-none">
                  {product.howToUse.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Sections */}
          {product.additionalInfo.map((info, index) => (
            <Card key={index} className="border-sage-light/50 shadow-soft">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{info.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{info.content}</p>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img src={info.image} alt={info.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* FAQs */}
          <Card className="border-sage-light/50 shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {product.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Product;