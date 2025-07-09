
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAdmin } from '@/contexts/AdminContext';
import { RootState } from '@/redux/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { categories } = useAdmin();
  const navigate = useNavigate();
  
  // Get user from Redux store
  const { user } = useSelector((state: RootState) => state.auth);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

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
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button className="flex items-center text-foreground hover:text-primary transition-colors">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isProductsDropdownOpen && categories.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="py-2">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsProductsDropdownOpen(false)}
                    >
                      All Products
                    </Link>
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
              <Link
                to="/products"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  className="block w-full text-left px-6 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md"
                >
                  {category.name}
                </button>
              ))}
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
