import { createContext } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    checkoutInfo: null,
    saveCheckoutInfo: () => {},
});
