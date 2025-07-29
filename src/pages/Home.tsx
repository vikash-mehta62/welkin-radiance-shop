import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Gift,
  Truck,
  Sparkles,
  Leaf,
  Target,
  Flag,
  FlaskConical,
} from "lucide-react";
import heroImage from "/2.jpg";
import productsGrid from "@/assets/products-grid.jpg";

export const slugOrder = [
  "derma-gold-intense-glow-cream-30-gm",
  "derma-white-50-gm",
  "tablet-uv-shield-1x10-tablets",
  "g4-max-glow-1x10-capsules",
  "porcelain-beauty-kit",
  "korean-glass-kit",
  "retinol-serum",
];
const Home = () => {
  const { products } = useAdmin();

  // Get first 4 products from AdminContext

  // Sort products based on the above slug order
  const sortedProducts = slugOrder
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean); // Removes any `undefined` if slug doesn't match

  const featuredProducts = sortedProducts.slice(0, 4).map((product) => ({
    id: product.id!,
    slug: product.slug,
    title: product.title,
    mrp: product.mrp,
    sellingPrice: product.sellingPrice,
    mainImage: product.images?.[0] || productsGrid,
    hoverImage: product.images?.[1] || product.images?.[0] || productsGrid,
    category: product.type,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[110vh] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* 15 Years Card */}
        <div className="absolute top-6 left-24 z-20">
          <div className=" text-white px-8 py-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold mt-1 leading-tight">
              15 Years of <br /> Real Results
            </h1>
          </div>
        </div>
      </section>

      {/* Text Content at Bottom */}
      <div className="w-full z-10 text-center px-4 bg-primary py-6">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground drop-shadow-lg">
          Your Daily Ritual of{" "}
          <span className="text-cream bg-gradient-to-r from-cream to-gold bg-clip-text text-transparent">
            Radiance
          </span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/90 mt-4 drop-shadow max-w-2xl mx-auto">
          Discover scientifically-formulated skincare that nurtures your skin's
          natural beauty
        </p>
      </div>

      <div className="min-h-[1px] min-w-full bg-maroon-darker"></div>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved skincare essentials, carefully curated for
              every skin type
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
                <Button
                  variant="luxury"
                  size="lg"
                  className="px-8 py-3"
                  asChild
                >
                  <a href="/products">View All Products</a>
                </Button>
              </div>
            </>
          ) : (
            <Card className="text-center py-12 border-maroon-light/50">
              <CardContent>
                <div className="mx-auto mb-4 w-16 h-16 bg-maroon-light rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-maroon-dark" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products available
                </h3>
                <p className="text-muted-foreground mb-4">
                  Products will appear here once they are created in the admin
                  panel.
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
      <section className="py-16 bg-maroon-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Welkin?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Targeted Skincare */}
            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Targeted Skincare for Aging and Pigmentation
              </h3>
              <p className="text-muted-foreground">
                Our products focus on two of the most common and stubborn skin
                concerns—fine lines and dark spots. Each formula is designed to
                restore skin clarity, elasticity, and brightness.
              </p>
            </div>

            {/* Made for Indian Skin */}
            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <Flag className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Made for Indian Skin
              </h3>
              <p className="text-muted-foreground">
                We formulate specifically for Indian skin tones and
                sensitivities, which often need a careful balance of active
                ingredients and hydration.
              </p>
            </div>

            {/* Science-First Formulation */}
            <div className="text-center group">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-button rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                <FlaskConical className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Science-First Formulation
              </h3>
              <p className="text-muted-foreground">
                Every product is developed with dermatological insight and
                powered by proven actives. No guesswork—just results backed by
                research.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
