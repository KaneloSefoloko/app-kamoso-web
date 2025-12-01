// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import MobileSidebar from "./components/MobileSidebar";

import CartProvider from "./components/CartProvider";
import { UIProvider } from "./components/UIContext";
import SafeErrorBoundary from "./components/SafeErrorBoundary";

// Pages
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import OurStory from "./components/OurStory";
import New from "./pages/New";
import Promos from "./pages/Promos";
import Apparel from "./pages/Apparel";
import Accessories from "./pages/Accessories";
import Footwear from "./pages/Footwear";
import LoginSignup from "./pages/LoginSignup";
import Login from "./pages/Login";
import CartPage from "./components/CartPage";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";

// Policies
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import TermsOfService from "./pages/policies/TermsOfService";
import ShippingDeliveryInformation from "./pages/policies/ShippingDeliveryInformation";
import CollectionPolicy from "./pages/policies/CollectionPolicy";
import ReturnPolicy from "./pages/policies/ReturnPolicy";

// Other pages
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import LogReturn from "./pages/LogReturn";
import Payments from "./pages/Payments";
import NotAvailable from "./pages/NotAvailable";

// Layouts & Routes
import AccountLayout from "./layout/AccountLayout";
import RequireAuth from "./routes/RequireAuth";
import CategoryPage from "./pages/CategoryPage.jsx";

const App = () => (
    <SafeErrorBoundary>
        <CartProvider>
            <UIProvider>
                {/* NAVBAR */}
                <Navbar />

                {/* MOBILE SIDEBAR */}
                <MobileSidebar />

                {/* ROUTES */}
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/category/:category" element={<CategoryPage />} /> {/* Category Page */}
                    <Route path="/products/:productSlug" element={<Layout><ProductPage /></Layout>} />
                    <Route path="/our-story" element={<OurStory />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/promos" element={<Layout><Promos /></Layout>} />
                    <Route path="/apparel" element={<Layout><Apparel /></Layout>} />
                    <Route path="/accessories" element={<Layout><Accessories /></Layout>} />
                    <Route path="/footwear" element={<Layout><Footwear /></Layout>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/signup" element={<LoginSignup />} />
                    <Route path="/login" element={<Login />} />

                        {/* Policies */}
                    <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                    <Route path="/policies/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
                    <Route path="/shipping" element={<Layout><ShippingDeliveryInformation /></Layout>} />
                    <Route path="/collection" element={<Layout><CollectionPolicy /></Layout>} />
                    <Route path="/returns-policy" element={<Layout><ReturnPolicy /></Layout>} />

                        {/* Other Pages */}
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/faqs" element={<Layout><FAQ /></Layout>} />
                    <Route path="/return" element={<Layout><LogReturn /></Layout>} />
                    <Route path="/payments" element={<Layout><Payments /></Layout>} />

                        {/* Checkout & Payment */}
                    <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                    <Route path="/pay" element={<Layout><PaymentPage /></Layout>} />

                        {/* Protected Routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="/orders" element={<AccountLayout><OrdersPage /></AccountLayout>} />
                    </Route>

                        {/* Placeholder routes */}
                    <Route path="/track-my-order" element={<NotAvailable />} />
                    <Route path="/gallery" element={<NotAvailable />} />
                    <Route path="/careers-opportunities" element={<NotAvailable />} />
                    <Route path="/blog-gazette" element={<NotAvailable />} />
                </Routes>

                {/* Floating Chat Button */}
                <button
                    className="fixed bottom-6 right-6 z-50 bg-white text-black w-16 h-16 rounded-full
                     shadow-md hover:bg-gray-200 transition text-xl flex items-center justify-center"
                >
                    💬
                </button>
            </UIProvider>
        </CartProvider>
    </SafeErrorBoundary>
);

export default App;
