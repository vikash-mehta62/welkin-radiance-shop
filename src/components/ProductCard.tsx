import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  mrp: number;
  sellingPrice: number;
  mainImage: string;
  hoverImage?: string;
  category?: string;
}

const ProductCard = ({ 
  id, 
  slug, 
  title, 
  mrp, 
  sellingPrice, 
  mainImage, 
  hoverImage,
  category 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      slug,
      title,
      price: sellingPrice,
      image: mainImage
    });
    
    toast({
      title: "Added to Cart!",
      description: `${title} added to your cart.`,
    });
  };

  return (
    <Card 
      className="group overflow-hidden border-sage-light/50 hover:shadow-elegant transition-all duration-500 bg-gradient-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link to={`/products/${slug}`}>
            <div className="aspect-square relative">
              <img
                src={isHovered && hoverImage ? hoverImage : mainImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-sage text-background px-2 py-1 rounded-full text-xs font-medium">
                  {discount}% OFF
                </div>
              )}
              {category && (
                <div className="absolute top-3 right-3 bg-background/90 text-sage-dark px-2 py-1 rounded-full text-xs font-medium">
                  {category}
                </div>
              )}
            </div>
          </Link>
          
          {/* Hover overlay with quick actions */}
      
        </div>

        <div className="p-4 space-y-3">
          <Link to={`/products/${slug}`}>
            <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">₹{sellingPrice}</span>
            {mrp > sellingPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{mrp}</span>
            )}
          </div>

          <Button variant="minimal" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;