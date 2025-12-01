import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();

    // Remove top padding on checkout
    const isCheckout = location.pathname === "/checkout" || location.pathname === "/pay";

    return (
        <div className={isCheckout ? "" : "pt-20 sm:pt-24 md:pt-28 lg:pt-32"}>
            {children}
        </div>
    );
};

export default Layout;
