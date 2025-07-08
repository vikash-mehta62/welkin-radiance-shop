
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-sage-light/5 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
