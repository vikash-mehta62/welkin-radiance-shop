
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { AdminProvider } from "@/contexts/AdminContext";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-sage-light/5 flex">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
