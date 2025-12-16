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

// 🔥 Chat system
import ChatDrawer from "./components/ChatDrawer";
import ChatButton from "./components/ChatButton";
import SearchPage from "./pages/SearchPage.jsx";

const App = () => {
    const [chatOpen, setChatOpen] = useState(false);

    const [messages, setMessages] = useState([
        {from: "bot", text: "Hi 👋 Welcome to KAVANTI. How can we help you?"},
    ]);

    return (
        <SafeErrorBoundary>
            <UIProvider>

                {/* NAVBAR */}
                <Navbar/>

                {/* MOBILE SIDEBAR */}
                <MobileSidebar/>

                {/* ROUTES */}
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Layout><Home/></Layout>}/>
                    <Route path="/category/:category" element={<Layout><CategoryPage/></Layout>}/>
                    <Route path="/products/:productSlug" element={<Layout><ProductPage/></Layout>}/>
                    <Route path="/our-story" element={<OurStory/>}/>
                    <Route path="/new" element={<New/>}/>
                    <Route path="/promos" element={<Layout><Promos/></Layout>}/>
                    <Route path="/apparel" element={<Layout><Apparel/></Layout>}/>
                    <Route path="/accessories" element={<Layout><Accessories/></Layout>}/>
                    <Route path="/footwear" element={<Layout><Footwear/></Layout>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/signup" element={<LoginSignup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<Layout><ForgotPassword/></Layout>}/>
                    <Route path="/mfa-challenge" element={<MFAChallenge/>}/>
                    <Route path="/setup-mfa" element={<Layout><SetupMFA/></Layout>}/>
                    <Route path="/search" element={<SearchPage />} />

                    {/* Policies */}
                    <Route path="/policies/privacy-policy" element={<Layout><PrivacyPolicy/></Layout>}/>
                    <Route path="/policies/terms-of-service" element={<Layout><TermsOfService/></Layout>}/>
                    <Route path="/shipping" element={<Layout><ShippingDeliveryInformation/></Layout>}/>
                    <Route path="/collection" element={<Layout><CollectionPolicy/></Layout>}/>
                    <Route path="/returns-policy" element={<Layout><ReturnPolicy/></Layout>}/>

                    {/* Other Pages */}
                    <Route path="/contact" element={<Layout><Contact/></Layout>}/>
                    <Route path="/faqs" element={<Layout><FAQ/></Layout>}/>
                    <Route path="/return" element={<Layout><LogReturn/></Layout>}/>
                    <Route path="/payments" element={<Layout><Payments/></Layout>}/>

                    {/* Checkout & Payment */}
                    <Route path="/checkout" element={<Layout><Checkout/></Layout>}/>
                    <Route path="/pay" element={<Layout><PaymentPage/></Layout>}/>

                    {/* Protected Routes */}
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

                    {/* Placeholder routes */}
                    <Route path="/track-my-order" element={<NotAvailable/>}/>
                    <Route path="/gallery" element={<NotAvailable/>}/>
                    <Route path="/careers-opportunities" element={<NotAvailable/>}/>
                    <Route path="/blog-gazette" element={<NotAvailable/>}/>
                </Routes>

                {/* 💬 CHAT SYSTEM */}
                <ChatDrawer
                    open={chatOpen}
                    onClose={() => setChatOpen(false)}
                    messages={messages}
                    setMessages={setMessages}
                />

                {!chatOpen && (
                    <ChatButton onClick={() => setChatOpen(true)}/>
                )}

            </UIProvider>
        </SafeErrorBoundary>
    );
};

export default App;
