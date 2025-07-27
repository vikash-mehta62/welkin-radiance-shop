
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { useAdmin } from "@/contexts/AdminContext";
import { Gift, Truck, Sparkles, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-skincare.jpg";
import productsGrid from "@/assets/products-grid.jpg";

const Home = () => {
  const { products } = useAdmin();
  
  // Get first 4 products from AdminContext
 const slugOrder = [
  "derma-gold-intense-glow-cream-30-gm",
  "derma-white-50-gm",
  "tablet-uv-shield-1x10-tablets",
  "g4-max-glow-1x10-capsules"
];

// Sort products based on the above slug order
const sortedProducts = slugOrder
  .map(slug => products.find(p => p.slug === slug))
  .filter(Boolean); // Removes any `undefined` if slug doesn't match

const featuredProducts = sortedProducts.slice(0, 4).map(product => ({
  id: product.id!,
  slug: product.slug,
  title: product.title,
  mrp: product.mrp,
  sellingPrice: product.sellingPrice,
  mainImage: product.images?.[0] || productsGrid,
  hoverImage: product.images?.[1] || product.images?.[0] || productsGrid,
  category: product.type
}));


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sage-dark/30 to-background/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Daily Ritual of{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-sage bg-clip-text text-transparent">
              Radiance
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover scientifically-formulated skincare that nurtures your skin's natural beauty
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Shop Now
            </Button>
            <Button variant="minimal" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div> */}
        </div>
      </section>

      {/* Offers Section */}
      {/* <section className="py-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-sage-light bg-background/80 backdrop-blur-sm shadow-card">
              <CardContent className="flex items-center justify-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-sage-light rounded-full">
                    <Gift className="h-8 w-8 text-sage-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">20% OFF</h3>
                    <p className="text-muted-foreground">On your first order</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sage-light bg-background/80 backdrop-blur-sm shadow-card">
              <CardContent className="flex items-center justify-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-sage-light rounded-full">
                    <Truck className="h-8 w-8 text-sage-dark" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">Free Delivery</h3>
                    <p className="text-muted-foreground">On all orders nationwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved skincare essentials, carefully curated for every skin type
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {featuredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="luxury" size="lg" className="px-8 py-3" asChild>
                  <a href="/products">View All Products</a>
                </Button>
              </div>
            </>
          ) : (
            <Card className="text-center py-12 border-sage-light/50">
              <CardContent>
                <div className="mx-auto mb-4 w-16 h-16 bg-sage-light rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-sage-dark" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products available
                </h3>
                <p className="text-muted-foreground mb-4">
                  Products will appear here once they are created in the admin panel.
                </p>
                <Button variant="luxury" asChild>
                  <a href="/admin/products/create">Create Product</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-sage-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Welkin?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Sparkles className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Scientifically Proven
              </h3>
              <p className="text-muted-foreground">
                All our formulations are backed by scientific research and dermatologist-tested
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Leaf className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Natural Ingredients
              </h3>
              <p className="text-muted-foreground">
                We source the finest natural ingredients while ensuring sustainable practices
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Gift className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Luxury Experience
              </h3>
              <p className="text-muted-foreground">
                Premium packaging and thoughtful design for your daily skincare ritual
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
