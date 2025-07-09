
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { RootState } from '@/redux/store';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from '@/pages/admin/ProductForm';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { items } = useCart(); // Use 'items' instead of 'cart'
  const { products } = useAdmin(); // Use 'products' to extract categories
  const navigate = useNavigate();

  // Get user from Redux store
  const { user } = useSelector((state: RootState) => state.auth);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const allCategories = categories

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
    setIsProductsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-foreground">Welkin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>

            {/* Products Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname.startsWith('/products')
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                    }`}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to="/products"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              All Products
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our complete range of premium skincare products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-2">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Categories</div>
                        {allCategories.slice(0, 6).map((category) => (
                          <NavigationMenuLink key={category} asChild>
                            <Link
                              to={`/products?category=${encodeURIComponent(category)}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{category}</div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                        {allCategories.length > 6 && (
                          <NavigationMenuLink asChild>
                            <Link
                              to="/products"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-primary"
                            >
                              <div className="text-sm font-medium leading-none">View All Categories</div>
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.name || 'Profile'}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>




              {/* Mobile Products Section */}
              <div className="space-y-2">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                  onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {isProductsDropdownOpen && (
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/products"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProductsDropdownOpen(false);
                      }}
                    >
                      All Products
                    </Link>
                    <div className="text-sm font-medium text-muted-foreground mt-2">Categories:</div>
                    {allCategories.slice(0, 4).map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProductsDropdownOpen(false);
                        }}
                      >
                        {category}
                      </Link>
                    ))}
                    {allCategories.length > 4 && (
                      <Link
                        to="/products"
                        className="block text-sm text-primary hover:text-primary/90 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProductsDropdownOpen(false);
                        }}
                      >
                        View All Categories
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-4 space-y-2">
                {user ? (
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 inline" />
                    {user.name || 'Profile'}
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                <Link
                  to="/cart"
                  className="flex items-center px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
