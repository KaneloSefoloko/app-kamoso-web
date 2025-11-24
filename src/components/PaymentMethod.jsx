import { useLocation } from "react-router-dom";
import { useUI } from "./UIContext.jsx";

const PaymentMethods = () => {
    const location = useLocation();
    const { menuOpen, cartOpen } = useUI();
    const hideOnRoutes = ["/login", "/signup"];

    if (hideOnRoutes.includes(location.pathname) || menuOpen || cartOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-neutral-500 text-white py-2 px-4 text-center text-sm font-light tracking-wide">
            CAPITEC PAY | APPLE PAY | GOOGLE PAY | PAYPAL
        </div>
    );
};

export default PaymentMethods;