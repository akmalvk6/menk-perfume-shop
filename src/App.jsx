import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedAdmin from "./components/ProtectedAdmin.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Products from "./pages/Products.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ManageOrders from "./pages/admin/ManageOrders.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <CartProvider>
      <div
        className={`min-h-screen ${
          isAdmin ? "admin-ui bg-mist text-ink" : "bg-cream text-ink"
        }`}
      >
        {!isAdmin && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/orders" element={<ManageOrders />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </CartProvider>
  );
}
