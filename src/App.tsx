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
import VideoConsult from "@/pages/VideoConsult";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import ProductForm from "@/pages/admin/ProductForm";
import OrderManagement from "@/pages/admin/OrderManagement";
import UserManagement from "@/pages/admin/UserManagement";
import NotFound from "./pages/NotFound";
import { fetchMyProfile } from "@/services2/operations/auth";
import Contact from "@/pages/Contact";
import ShippingInfo from "@/pages/ShippingInfo";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

// AUTH
import PrivateRoute from "@/components/auth/PrivateRoute";
import OpenRoute from "@/components/auth/OpenRoute";
import AdminRoute from "./components/auth/AdminRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import ScrollToTop from "./ScrollToTop";
import ConsultationForm from "./pages/ConsultationForm";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authData = useSelector((state: RootState) => state.auth);
  const isAuthenticated = authData?.token ? true : false;
  const dispatch = useDispatch();

  useEffect(() => {
    if (authData?.token) {
      dispatch(fetchMyProfile(authData?.token));
    }
  }, []);
  return (
    <TooltipProvider>
      <AdminProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Routes>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />

            {/* Admin Routes (Private) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="products/create" element={<ProductForm />} />
              <Route path="products/:id/edit" element={<ProductForm />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>

            {/* Client Routes (with layout) */}
            <Route
              path="/*"
              element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route
                        path="/consultation"
                        element={<ConsultationForm />}
                      />
                      <Route path="/products/:slug" element={<Product />} />
                      {/* <Route path="/video-consult" element={<VideoConsult />} /> */}
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/shipping" element={<ShippingInfo />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/checkout"
                        element={
                          <PrivateRoute>
                            <Checkout />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <Profile />
                          </PrivateRoute>
                        }
                      />
                      {/* Catch-all */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  );
};

export default App;
