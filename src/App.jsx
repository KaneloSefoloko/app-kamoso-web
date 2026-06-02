// App.jsx
import React, {useState} from "react";
import {Routes, Route} from "react-router-dom";

// Core UI
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import MobileSidebar from "./components/MobileSidebar";

// Providers
import {UIProvider} from "./components/UIContext";
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
import MFAChallenge from "./pages/MFAChallenge";
import SetupMFA from "./pages/SetupMFA";
import CartPage from "./components/CartPage";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import ForgotPassword from "./pages/ForgotPassword";

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
import AccountProfilePage from "./account/AccountProfilePage.jsx";

// Search
import SearchPage from "./pages/SearchPage.jsx";

// Chat system
import ChatDrawer from "./components/ChatDrawer";
import ChatButton from "./components/ChatButton";

// ================= ADMIN =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import SlidesManager from "./pages/admin/SlidesManager";
import ProductsManager from "./pages/admin/ProductsManager";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./pages/admin/adminLayout.jsx";
import ScrollToTop from "./components/ScrollToTop";
import PageWrapper from "./components/PageWrapper";
import {CartProvider} from "./components/CartContext";
import {WishlistProvider} from "./components/WishlistContext";
import { ToastProvider } from "./components/ToastContext";
import CookieConsent from "./components/CookieConsent.jsx";

const App = () => {
    const [chatOpen, setChatOpen] = useState(false);

    const [messages, setMessages] = useState([
        {from: "bot", text: "Hi 👋 Welcome to KAVANTI. How can we help you?"},
    ]);

    return (
        <SafeErrorBoundary>
            <UIProvider>
                <ToastProvider>
                <CartProvider>
                    <WishlistProvider>
                        <ScrollToTop/>

                        {/* NAVBAR */}
                        <Navbar/>

                        {/* MOBILE SIDEBAR */}
                        <MobileSidebar/>

                        {/* ROUTES */}
                        <Routes>

                            {/* ================= PUBLIC PAGES ================= */}
                            <Route path="/" element={
                                <PageWrapper>
                                    <Layout><Home/></Layout>
                                </PageWrapper>
                            }/>
                            <Route path="/category/:category" element={<Layout><CategoryPage/></Layout>}/>
                            <Route path="/products/:productSlug" element={<Layout><ProductPage/></Layout>}/>
                            <Route path="/our-story" element={<OurStory/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/promos" element={<Layout><Promos/></Layout>}/>
                            <Route path="/apparel" element={<Layout><Apparel/></Layout>}/>
                            <Route path="/accessories" element={<Layout><Accessories/></Layout>}/>
                            <Route path="/footwear" element={<Layout><Footwear/></Layout>}/>

                            {/* CART / AUTH */}
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/signup" element={<LoginSignup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/forgot-password" element={<Layout><ForgotPassword/></Layout>}/>
                            <Route path="/mfa-challenge" element={<MFAChallenge/>}/>
                            <Route path="/setup-mfa" element={<Layout><SetupMFA/></Layout>}/>

                            {/* SEARCH */}
                            <Route path="/search" element={<SearchPage/>}/>

                            {/* ================= POLICIES ================= */}
                            <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy/></Layout>}/>
                            <Route path="/policies/terms-of-service" element={<Layout><TermsOfService/></Layout>}/>
                            <Route path="/shipping" element={<Layout><ShippingDeliveryInformation/></Layout>}/>
                            <Route path="/collection" element={<Layout><CollectionPolicy/></Layout>}/>
                            <Route path="/returns-policy" element={<Layout><ReturnPolicy/></Layout>}/>

                            {/* ================= OTHER PAGES ================= */}
                            <Route path="/contact" element={<Layout><Contact/></Layout>}/>
                            <Route path="/faqs" element={<Layout><FAQ/></Layout>}/>
                            <Route path="/return" element={<Layout><LogReturn/></Layout>}/>
                            <Route path="/payments" element={<Layout><Payments/></Layout>}/>

                            {/* CHECKOUT */}
                            <Route path="/checkout" element={<Layout><Checkout/></Layout>}/>
                            <Route path="/pay" element={<Layout><PaymentPage/></Layout>}/>

                            {/* ================= USER PROTECTED ================= */}
                            <Route element={<RequireAuth/>}>
                                <Route
                                    path="/orders"
                                    element={
                                        <AccountLayout>
                                            <OrdersPage/>
                                        </AccountLayout>
                                    }
                                />

                                <Route
                                    path="/account/profile"
                                    element={
                                        <AccountLayout>
                                            <AccountProfilePage/>
                                        </AccountLayout>
                                    }
                                />
                            </Route>

                            {/* ================= ADMIN PROTECTED ================= */}
                            <Route element={<ProtectedAdminRoute/>}>
                                <Route element={<AdminLayout/>}>
                                    <Route path="/admin" element={<Layout><AdminDashboard/></Layout>}/>
                                    <Route path="/admin/slides" element={<Layout><SlidesManager/></Layout>}/>
                                    <Route path="/admin/products" element={<Layout><ProductsManager/></Layout>}/>
                                </Route>
                            </Route>

                            {/* ================= PLACEHOLDERS ================= */}
                            <Route path="/track-my-order" element={<NotAvailable/>}/>
                            <Route path="/gallery" element={<NotAvailable/>}/>
                            <Route path="/careers-opportunities" element={<NotAvailable/>}/>
                            <Route path="/blog-gazette" element={<NotAvailable/>}/>

                        </Routes>

                        {/* ================= CHAT SYSTEM ================= */}
                        <CookieConsent />
                        <ChatDrawer
                            open={chatOpen}
                            onClose={() => setChatOpen(false)}
                            messages={messages}
                            setMessages={setMessages}
                        />

                        {!chatOpen && (
                            <ChatButton onClick={() => setChatOpen(true)}/>
                        )}

                    </WishlistProvider>
                </CartProvider>
                    </ToastProvider>
            </UIProvider>
        </SafeErrorBoundary>
    );
};

export default App;