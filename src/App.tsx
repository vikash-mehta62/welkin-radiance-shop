import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLayout from "@/components/AdminLayout";
import Home from "@/pages/Home";
import Products from "@/pages/Products"; 
import Product from "@/pages/Product";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import ProductForm from "@/pages/admin/ProductForm";
import OrderManagement from "@/pages/admin/OrderManagement";
import UserManagement from "@/pages/admin/UserManagement";
import NotFound from "./pages/NotFound";

// AUTH
import PrivateRoute from "@/components/auth/PrivateRoute";
import OpenRoute from "@/components/auth/OpenRoute";
import AdminRoute from "./components/auth/AdminRoute";

const App = () => (

  
  <TooltipProvider>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />

          {/* Admin Routes (Private) */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/create" element={<ProductForm />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>

          {/* Client Routes (with layout) */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<Product />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                  <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </TooltipProvider>
);

export default App;
