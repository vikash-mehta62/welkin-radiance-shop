
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
      "bg-white border-r-2 border-sage-light/50 shadow-lg transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-6 border-b-2 border-sage-light/30 flex items-center justify-between bg-gradient-to-r from-sage-light/20 to-sage-light/10">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <span className="text-background font-bold text-lg">W</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground block">
                Welkin
              </span>
              <span className="text-sm text-sage-dark font-medium">Admin Panel</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-9 w-9 p-0 hover:bg-sage-light/30 rounded-lg"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group",
              isActive(item.href)
                ? "bg-gradient-primary text-background shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-sage-light/20 hover:scale-102"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110",
              isActive(item.href) ? "text-background" : ""
            )} />
            {!collapsed && <span className="font-medium">{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-sage-light/30 space-y-3 bg-sage-light/5">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sage-light/20 h-10 rounded-lg",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3 font-medium">Settings</span>}
        </Button>
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sage-light/20 h-10 rounded-lg",
              collapsed && "justify-center px-0"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 font-medium">Exit Admin</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
