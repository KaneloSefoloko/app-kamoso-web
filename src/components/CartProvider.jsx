import React, { useState, useEffect } from "react";
import {CartContext} from './CartContext';

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [checkoutInfo, setCheckoutInfo] = useState(() => {
        const savedCheckout = localStorage.getItem("checkoutInfo");
        return savedCheckout ? JSON.parse(savedCheckout) : null;
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (checkoutInfo) localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));
    }, [checkoutInfo]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

    const updateQuantity = (id, qty) =>
        setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));

    const clearCart = () => setCart([]);

    const saveCheckoutInfo = (info) => setCheckoutInfo(info);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                checkoutInfo,
                saveCheckoutInfo,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
