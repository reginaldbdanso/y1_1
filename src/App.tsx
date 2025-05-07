import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import { createGlobalStyle } from "styled-components"
import { CartProvider } from "./context/CartContext"
import DailyDeals from "./pages/DailyDeals"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import Index from "./pages/Index"
import BundleDeals from "./pages/BundleDeals"
import Support from "./pages/Support"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Careers from "./pages/Careers"
import Legal from "./pages/Legal"
import FAQs from "./pages/FAQs"
import Contact from "./pages/Contact"
import SecureCheckout from "./components/SecureCheckout"
import ShippingDetails from "./pages/ShippingDetails"
import ShippingAddress from "./pages/ShippingAddress"
import PaymentMobile from "./components/PaymentMobile"
import PaymentApproval from "./components/PaymentApproval"
import ProductView from "./components/ProductView"
import CategoryProducts from "./components/CategoryProducts"
import { useAuth } from "./context/AuthContext"


import './App.css';

const App: React.FC = () => {
  const { state } = useAuth();

  // if (authState.user.isLoggedIn) {
  //   console.log("User is logged in");
  // } else {
  //   console.log("User is not logged in");}
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daily-deals" element={<DailyDeals />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bundle-deals" element={<BundleDeals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={state.user.isLoggedIn ? <Navigate to="/daily-deals" replace /> : <Login />} />
          <Route path="/signup" element={state.user.isLoggedIn ? <Navigate to="/daily-deals" replace /> : <SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-account" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<SecureCheckout />} />
          <Route path="/shipping-address" element={<ShippingAddress />} />
          <Route path="/shipping-details" element={<ShippingDetails />} />
          <Route path="/payment-mobile" element={<PaymentMobile />} />
          <Route path="/payment-approval" element={<PaymentApproval />} />
          <Route path="/product/:id" element={<ProductView />} />
          {/* Ensure this route is correctly defined */}
          <Route path="/category/:category" element={<CategoryProducts />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}
export default App

