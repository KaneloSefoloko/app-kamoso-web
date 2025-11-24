import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PaymentMethods from './components/PaymentMethod';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage.jsx';
import CartProvider from './components/CartProvider.jsx';
import OurStory from './components/OurStory';
import New from "./pages/New.jsx";
import Promos from "./pages/Promos.jsx";
import Apparel from "./pages/Apparel.jsx";
import Accessories from "./pages/Accessories.jsx";
import Footwear from "./pages/Footwear.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Login from "./pages/Login.jsx";
import CartPage from "./components/CartPage.jsx";
import Layout from "./components/Layout.jsx";
import {UIProvider} from "./components/UIContext.jsx";

const App = () => (

    <CartProvider>
        <UIProvider>
        <>
            <PaymentMethods />
            <Navbar />

            <Routes>

                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/products/:productSlug" element={<Layout><ProductPage /></Layout>} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/new" element={<New />} />
                <Route path="/promos" element={<Promos />} />
                <Route path="/apparel" element={<Apparel />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/footwear" element={<Footwear />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signup" element={<LoginSignup />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            {/* Floating Chat Button */}
            <button
                className="fixed bottom-6 right-6 z-50 bg-white text-black w-16 h-16 rounded-full
        shadow-md hover:bg-gray-200 transition text-xl flex items-center justify-center"
            >
                💬
            </button>
        </>
            </UIProvider>
    </CartProvider>
);

export default App;