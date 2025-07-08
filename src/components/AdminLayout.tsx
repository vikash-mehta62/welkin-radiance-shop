
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-sage-light/5 flex w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          {/* Mobile header with trigger */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">W</span>
              </div>
              <span className="text-lg font-bold text-foreground">Welkin Admin</span>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
