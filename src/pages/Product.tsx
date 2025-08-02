import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Minus,
  Plus,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { PatientResultsCarousel } from "@/components/PatientResultsCarousel";
import { ConsultationModal } from "@/components/ConsultationModal";

// Mock Product Card Component for Related Products
interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercentage =
    product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;

  return (
    <Link to={`/products/${product.slug}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.title}
            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
          />
          {discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 text-xs"
            >
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mb-2">
              {product.category.join(", ")}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                ₹{product.sellingPrice.toLocaleString()}
              </span>
              {product.mrp > product.sellingPrice && (
                <span className="text-sm text-slate-500 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useAdmin();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(()=>{
    setSelectedImageIndex(0)
  },[slug])
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const relatedProducts = products
    .filter((p) => p.slug !== product?.slug)
    .slice(0, 10);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h1 className="text-xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
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
        image: product.images[0] || "/placeholder.svg",
      });
    }

    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.title} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout or cart
    window.location.href = "/cart";
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const discountPercentage =
    product.mrp > product.sellingPrice
      ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-4 lg:h-fit space-y-3 lg:space-y-4">
            <div className="relative group">
              <div
                className="relative overflow-hidden rounded-lg lg:rounded-xl bg-white shadow-lg lg:shadow-xl aspect-square cursor-zoom-in flex items-center justify-center"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.title}
                  className={`w-full h-full object-contain transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                />

                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-md h-7 w-7 lg:h-8 lg:w-8"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-3 w-3 lg:h-4 lg:w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-md h-7 w-7 lg:h-8 lg:w-8"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                    </Button>
                  </>
                )}

                <div className="absolute top-2 lg:top-3 right-2 lg:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <ZoomIn className="h-3 w-3" />
                    <span className="hidden sm:inline">Zoom</span>
                  </div>
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-md lg:rounded-lg overflow-hidden transition-all duration-200 flex items-center justify-center ${
                      selectedImageIndex === index
                        ? "ring-2 ring-blue-500 ring-offset-1 scale-105"
                        : "hover:scale-105 hover:shadow-md"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 lg:space-y-5">
            <div className="space-y-2 lg:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs"
                >
                  {product.type}
                </Badge>
                {product.category.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="border-slate-300 text-xs"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  (4.8 • 124 reviews)
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-3 lg:p-4 rounded-lg lg:rounded-xl">
              <div className="flex items-center gap-2 lg:gap-3 mb-1">
                <span className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ₹{product.sellingPrice.toLocaleString()}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-sm lg:text-base text-slate-500 line-through">
                      ₹{product.mrp.toLocaleString()}
                    </span>
                    <Badge
                      variant="destructive"
                      className="bg-red-500 text-white text-xs"
                    >
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Inclusive of all taxes • Free shipping on orders above ₹999
              </p>
            </div>

            {product.keyBenefits && (
              <Card className="border-0 shadow-md bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-3 lg:p-4">
                  <div
                    className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed [&>ul]:space-y-1 [&>ul>li]:text-xs [&>ul>li]:lg:text-sm [&>ul>li]:leading-snug"
                    dangerouslySetInnerHTML={{ __html: product.keyBenefits }}
                  />
                </CardContent>
              </Card>
            )}

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center gap-3 lg:gap-4">
                <span className="text-sm lg:text-base font-medium text-slate-900 dark:text-slate-100">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Minus className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                  <span className="px-3 lg:px-4 py-2 text-sm lg:text-base font-semibold bg-slate-50 dark:bg-slate-800 min-w-[40px] lg:min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-8 w-8 lg:h-9 lg:w-9 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Plus className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full h-11 lg:h-12 text-sm lg:text-base font-semibold bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-background shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleBuyNow}
                >
                  <CreditCard className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Buy It Now - ₹
                  {(product.sellingPrice * quantity).toLocaleString()}
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 lg:h-12 text-sm lg:text-base font-semibold border-2 border-maroon text-maroon hover:bg-maroon hover:text-background transition-all duration-200"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Add to Cart
                </Button>

                
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="mt-12 lg:mt-16 max-w-6xl mx-auto">
          <PatientResultsCarousel
            onConsultClick={() => setIsConsultationModalOpen(true)}
          />
        </div> */}

        <div className="mt-8 lg:mt-12 max-w-5xl mx-auto" id="product-info">
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 lg:mb-6 text-center">
            Product Information
          </h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="description"
            className="space-y-3"
          >
            {product.description && (
              <AccordionItem
                value="description"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  Key Benefits
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <div
                    className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {product.skinSuitability && (
              <AccordionItem
                value="skin-suitability"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  Recommended for
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <div
                    className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.skinSuitability,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {product.howToUse && (
              <AccordionItem
                value="how-to-use"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  How to Use
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <div
                    className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.howToUse }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}

            {product.ingredients && product.ingredients.length > 0 && (
              <AccordionItem
                value="ingredients"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  Ingredients
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.ingredients
                      .filter((ing) => ing.trim())
                      .map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-xs lg:text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          {ingredient}
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}



   {product.precataions && (
              <AccordionItem
                value="how-to-use"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                 Precautions
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <div
                    className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.precataions }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}


         {product.extraInfoBlocks && product.extraInfoBlocks.length > 0 && (
  <Accordion type="multiple" className="w-full">
    {product.extraInfoBlocks.map((block, index) => (
      <AccordionItem
        key={block.title + index}
        value={`extra-info-${index}`}
        className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden mb-2"
      >
        <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
          {block.title}
        </AccordionTrigger>
        <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4 space-y-6 lg:space-y-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`space-y-2 lg:space-y-3 ${
                index % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <div
                className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            </div>

            {block.image && (
              <div
                className={`${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative w-full h-40 lg:h-48 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={block.image || "/placeholder.svg"}
                    alt={block.title}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)}


            {product.faqs && product.faqs.length > 0 && (
              <AccordionItem
                value="faqs"
                className="border-0 bg-white dark:bg-slate-800 rounded-lg lg:rounded-xl shadow-md overflow-hidden"
              >
                <AccordionTrigger className="text-slate-900 dark:text-slate-100 text-sm lg:text-base font-semibold px-3 lg:px-6 py-3 lg:py-4 hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  Frequently Asked Questions
                </AccordionTrigger>
                <AccordionContent className="px-3 lg:px-6 pb-3 lg:pb-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    {product.faqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.id}
                        value={`faq-${index}`}
                        className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden"
                      >
                        <AccordionTrigger className="text-slate-900 dark:text-slate-100 font-medium px-3 py-2.5 text-left hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs lg:text-sm">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-2.5">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs lg:text-sm">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>

        {relatedProducts.length > 0 && (
          <>
            <hr className="my-12 lg:my-16 border-t border-slate-200 dark:border-slate-700 max-w-7xl mx-auto" />
            <div className="mt-12 lg:mt-16 max-w-7xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 lg:mb-8 text-center">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        open={isConsultationModalOpen}
        onOpenChange={setIsConsultationModalOpen}
      />
    </div>
  );
}
