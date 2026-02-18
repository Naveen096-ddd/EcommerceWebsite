import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BlogsProvider } from "./components/context/BlogContext";
import { CartProvider } from "./components/context/CartContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import UserDashboard from "./components/dashboard/userDashboard/UserDashboard";
const Login = lazy(() => import("./pages/loginpage/Loginpage"));
const SignupPage = lazy(() => import("./pages/signuppage/SignupPage"));
const AdminDashboard = lazy(() => import("./components/dashboard/adminDashboard/AdminDashboard"));
const Aboutus = lazy(() => import("./pages/Home/aboutus/Aboutus"));
const ContactUs = lazy(() => import("./pages/Home/contactus/ContactUs"));
const Categories = lazy(() => import("./pages/Home/catagories/Catagories"));
const Shop = lazy(() => import("./pages/Home/shop/Shop"));
const Blog = lazy(() => import("./pages/Home/blog/Blog"));
import ManagerDashboard from "./components/dashboard/managerDashboard/ManagerDashboard";
import { ShopProvider } from "./components/context/ShopContext";
function App() {
  return (
    <ShopProvider>
    <CartProvider>
      <BlogsProvider>
        <Router>
          <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navbar/>} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/userdash"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admindash"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/managerdash"
                element={
                  <ProtectedRoute allowedRoles={["manager"]}>
                    <ManagerDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </BlogsProvider>
    </CartProvider>
    </ShopProvider>
  );
}

export default App;
