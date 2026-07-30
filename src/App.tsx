import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import PageLoader from "./components/PageLoader/PageLoader";

// Route-level code splitting: each page becomes its own chunk instead of
// one monolithic bundle, so a shopper landing on "/" doesn't pay for the
// admin dashboard or vendor panel until they actually navigate there.
const Home = lazy(() => import("./pages/Home/Home"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const Login = lazy(() => import("./pages/Home/Login/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("./pages/Register/Register").then((m) => ({ default: m.Register })));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const ProductDetail = lazy(() => import("./pages/ProductDetail/ProductDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist"));
const Compare = lazy(() => import("./pages/Compare/Compare"));
const BecomeVendor = lazy(() => import("./pages/BecomeVendor/BecomeVendor"));
const VendorPanel = lazy(() => import("./pages/VendorPanel/VendorPanel"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Deals = lazy(() => import("./pages/Deals/Deals"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogPost = lazy(() => import("./pages/Blog/BlogPost"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/become-vendor" element={<BecomeVendor />} />
        <Route path="/vendor-panel" element={<VendorPanel />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/discounts" element={<Deals />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
