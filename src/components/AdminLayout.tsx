import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/AdminHeader";
import { AdminProvider } from "@/contexts/AdminContext";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;