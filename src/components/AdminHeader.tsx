import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="bg-background border-b border-sage-light/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm">W</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            Welkin <span className="text-sage">Admin</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/admin/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/admin/orders" className="text-foreground hover:text-primary transition-colors">
            Orders
          </Link>
          <Link to="/admin/users" className="text-foreground hover:text-primary transition-colors">
            Users
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Admin
          </Button>
          <Link to="/">
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Exit Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;