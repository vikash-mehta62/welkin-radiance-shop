
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Star, Heart, Share2 } from "lucide-react";

const mockProducts = [
  {
    id: "1",
    slug: "aloe-vera-gel",
    name: "Aloe Vera Gel",
    description: "Soothing gel for skin hydration and sunburn relief.",
    price: 12.99,
    imageUrl: "https://via.placeholder.com/400x300",
    category: "Skincare",
    tags: ["aloe vera", "gel", "hydration", "sunburn"],
    rating: 4.5,
    reviews: 50,
    availability: true,
    features: ["Organic", "Vegan", "Cruelty-Free"],
  },
  {
    id: "2",
    slug: "vitamin-c-serum",
    name: "Vitamin C Serum",
    description: "Brightening serum to boost collagen and reduce wrinkles.",
    price: 24.50,
    imageUrl: "https://via.placeholder.com/400x300",
    category: "Skincare",
    tags: ["vitamin c", "serum", "brightening", "collagen"],
    rating: 4.8,
    reviews: 75,
    availability: true,
    features: ["Paraben-Free", "Non-Comedogenic"],
  },
  {
    id: "3",
    slug: "hyaluronic-acid",
    name: "Hyaluronic Acid Serum",
    description: "Intensely hydrating serum for plump and dewy skin.",
    price: 19.99,
    imageUrl: "https://via.placeholder.com/400x300",
    category: "Skincare",
    tags: ["hyaluronic acid", "serum", "hydration", "plump"],
    rating: 4.7,
    reviews: 60,
    availability: false,
    features: ["Fragrance-Free", "Oil-Free"],
  },
];

const Product = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = mockProducts.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      title: product.name,
      price: product.price,
      image: product.imageUrl,
    });
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="text-foreground">{product.rating}</span>
            <span className="text-muted-foreground ml-2">({product.reviews} reviews)</span>
          </div>
          <p className="text-muted-foreground mb-4">{product.description}</p>

          {/* Price and Availability */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-semibold text-foreground">₹{product.price}</span>
            {product.availability ? (
              <Badge variant="secondary">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center mb-6">
            <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4 text-foreground">{quantity}</span>
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full bg-gradient-primary text-background hover:opacity-90" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          {/* Product Features */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Features</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Accordion for More Details */}
          <div className="mt-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="details">
                <AccordionTrigger className="text-foreground">More Details</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    This product is carefully crafted with the finest ingredients to ensure the best
                    experience for your skin. It is suitable for all skin types and is designed to
                    provide long-lasting hydration and protection.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-foreground">Shipping Information</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>
                    We offer worldwide shipping with delivery times varying based on your location.
                    Please check our shipping policy for more details.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Social Sharing */}
          <div className="mt-6 flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
