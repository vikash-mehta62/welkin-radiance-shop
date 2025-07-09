// src/components/auth/AdminRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import React from "react";
import { RootState } from "@/redux/store";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const location = useLocation();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    // Not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
