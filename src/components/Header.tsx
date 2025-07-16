
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useCart();
  const { categories, loading } = useAdmin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.auth);
  const isAuthenticated = authData?.token ? true : false;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setIsProductDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.product-dropdown')) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-background border-b border-sage-light/30 sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              Welkin Radiance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-sage transition-colors"
            >
              Home
            </Link>
            
            {/* Products with Dropdown */}
            <div 
              className="relative product-dropdown"
              onMouseEnter={() => setIsProductDropdownOpen(true)}
              onMouseLeave={() => setIsProductDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-sage transition-colors">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-sage-light/30 rounded-lg shadow-elegant p-4 z-50">
                  <div className="space-y-2">
                    <Link
                      to="/products"
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-sage hover:bg-sage-light/10 rounded-md transition-colors"
                      onClick={() => setIsProductDropdownOpen(false)}
                    >
                      All Products
                    </Link>
                    
                    {!loading && categories.length > 0 && (
                      <>
                        <div className="border-t border-sage-light/20 my-2"></div>
                        <div className="text-xs font-medium text-muted-foreground px-3 py-1">
                          Categories
                        </div>
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-sage hover:bg-sage-light/10 rounded-md transition-colors"
                          >
                            {category}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-muted-foreground hover:text-sage transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full border-sage-light/50 focus:border-sage"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-sage text-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="luxury" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-sage-light/30 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-sage transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-muted-foreground hover:text-sage transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              {!loading && categories.length > 0 && (
                <div className="ml-4 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        handleCategoryClick(category);
                        setIsMenuOpen(false);
                      }}
                      className="block text-left text-sm text-muted-foreground hover:text-sage transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
              
              <Link
                to="/about"
                className="text-muted-foreground hover:text-sage transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full border-sage-light/50 focus:border-sage"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
