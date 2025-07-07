

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/contexts/CartContext";
import { useAdmin } from "@/contexts/AdminContext";
import { Minus, Plus, Star, Heart, Share2 } from "lucide-react";

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useAdmin();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.sellingPrice,
        image: product.images[0] || '/placeholder.svg',
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPercentage = product.mrp > product.sellingPrice 
    ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <img
            src={product.images[0] || '/placeholder.svg'}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image || '/placeholder.svg'}
                  alt={`${product.title} ${index + 2}`}
                  className="w-full h-20 object-cover rounded-md border hover:border-sage-dark cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.type}</Badge>
            {product.category.map(cat => (
              <Badge key={cat} variant="outline">{cat}</Badge>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground ml-2">(4.8 • 124 reviews)</span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-foreground">₹{product.sellingPrice}</span>
            {discountPercentage > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">₹{product.mrp}</span>
                <Badge variant="destructive">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          {/* Key Benefits */}
          {product.keyBenefits && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Key Benefits</h3>
              <div 
                className="text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.keyBenefits }}
              />
            </div>
          )}

          {/* Quantity Selection */}
          <div className="flex items-center mb-6">
            <span className="text-foreground mr-4">Quantity:</span>
            <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 text-foreground font-semibold">{quantity}</span>
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button 
            className="w-full bg-gradient-primary text-background hover:opacity-90 mb-6" 
            onClick={handleAddToCart}
            size="lg"
          >
            Add to Cart - ₹{product.sellingPrice * quantity}
          </Button>

          {/* Social Actions */}
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-12">
        <Accordion type="single" collapsible className="space-y-4">
          {product.description && (
            <AccordionItem value="description" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                Description
              </AccordionTrigger>
              <AccordionContent>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </AccordionContent>
            </AccordionItem>
          )}

          {product.skinSuitability && (
            <AccordionItem value="skin-suitability" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                Skin Suitability
              </AccordionTrigger>
              <AccordionContent>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.skinSuitability }}
                />
              </AccordionContent>
            </AccordionItem>
          )}

          {product.howToUse && (
            <AccordionItem value="how-to-use" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                How to Use
              </AccordionTrigger>
              <AccordionContent>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.howToUse }}
                />
              </AccordionContent>
            </AccordionItem>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <AccordionItem value="ingredients" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                Ingredients
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.ingredients.filter(ing => ing.trim()).map((ingredient, index) => (
                    <div key={index} className="text-muted-foreground">
                      • {ingredient}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {product.extraInfoBlocks && product.extraInfoBlocks.length > 0 && (
            <AccordionItem value="additional-info" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="space-y-6">
                {product.extraInfoBlocks.map((block, index) => (
                  <div key={block.id} className="border-b pb-4 last:border-b-0">
                    {block.image && (
                      <img 
                        src={block.image} 
                        alt={block.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    {block.title && (
                      <h4 className="text-lg font-semibold text-foreground mb-2">{block.title}</h4>
                    )}
                    <div 
                      className="text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {product.faqs && product.faqs.length > 0 && (
            <AccordionItem value="faqs" className="border rounded-lg px-4">
              <AccordionTrigger className="text-foreground text-lg font-semibold">
                Frequently Asked Questions
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {product.faqs.map((faq, index) => (
                  <div key={faq.id} className="border-b pb-4 last:border-b-0">
                    <h5 className="font-semibold text-foreground mb-2">{faq.question}</h5>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Product;

