
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { AdminProvider } from "@/contexts/AdminContext";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-muted/30 flex">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
