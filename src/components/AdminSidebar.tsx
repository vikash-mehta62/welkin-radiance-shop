
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      "bg-white border-r border-sage-light/30 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sage-light/30 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">W</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              Welkin <span className="text-sage">Admin</span>
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
              isActive(item.href)
                ? "bg-sage-light/20 text-sage-dark border border-sage-light/50"
                : "text-muted-foreground hover:text-foreground hover:bg-sage-light/10"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sage-light/30 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground",
            collapsed && "justify-center"
          )}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-foreground",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Exit Admin</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
