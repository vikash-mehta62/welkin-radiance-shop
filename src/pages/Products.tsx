
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { useAdmin } from "@/contexts/AdminContext";
import { Filter, Grid, List } from "lucide-react";

const Products = () => {
  const { products } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from products
  const allCategories = Array.from(new Set(products.flatMap(product => product.category)));
  const categories = ['all', ...allCategories];

  // Handle URL category parameter
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && allCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else if (categoryFromUrl === null) {
      setSelectedCategory('all');
    }
  }, [searchParams, allCategories]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category.includes(selectedCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.sellingPrice - b.sellingPrice;
      case 'price-high':
        return b.sellingPrice - a.sellingPrice;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Convert admin products to ProductCard format
  const productCards = sortedProducts.map(product => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    mrp: product.mrp,
    sellingPrice: product.sellingPrice,
    mainImage: product.images[0] || '/placeholder.svg',
    hoverImage: product.images[1] || product.images[0] || '/placeholder.svg',
    category: product.type,
    type: product.category[0] || 'Skincare'
  }));

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory} Products`}
          </h1>
          <p className="text-lg text-muted-foreground">
            {selectedCategory === 'all' 
              ? 'Discover our complete range of premium skincare products'
              : `Explore our ${selectedCategory.toLowerCase()} collection`
            }
          </p>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-8 border-sage-light/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-sage-dark" />
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px] border-sage-light">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] border-sage-light">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-sage-light rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'luxury' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'luxury' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {productCards.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <Card className="text-center py-12 border-sage-light/50">
            <CardContent>
              <div className="mx-auto mb-4 w-16 h-16 bg-sage-light rounded-full flex items-center justify-center">
                <Filter className="h-8 w-8 text-sage-dark" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-4">
                {products.length === 0 
                  ? "No products have been created yet. Create your first product in the admin panel."
                  : selectedCategory === 'all'
                    ? "Try adjusting your filters to see more products"
                    : `No products found in ${selectedCategory} category. Try selecting a different category.`
                }
              </p>
              {products.length === 0 ? (
                <Button variant="luxury" asChild>
                  <a href="/admin/products/create">Create Product</a>
                </Button>
              ) : (
                <Button variant="luxury" onClick={() => handleCategoryChange('all')}>
                  View All Products
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Load More - Only show if there are products */}
        {sortedProducts.length > 0 && sortedProducts.length >= 12 && (
          <div className="text-center">
            <Button variant="minimal" size="lg" className="px-8 py-3">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
