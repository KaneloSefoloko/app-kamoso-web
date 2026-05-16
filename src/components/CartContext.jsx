import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

const CART_KEY = "cart";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [checkoutInfo, setCheckoutInfo] = useState(() => {
        const saved = localStorage.getItem("checkoutInfo");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, variant = null, size = null, quantity = 1) => {
        if (!product) return;

        const selected = variant || product.variants?.[0] || product;

        const item = {
            slug: product.slug,
            name: product.name,
            image: selected.image || product.image,
            price: selected.price || product.price,
            size: size || "ONE_SIZE",
            quantity,
            color: selected.color || null,
        };

        setCart((prev) => {
            const index = prev.findIndex(
                (p) =>
                    p.slug === item.slug &&
                    p.size === item.size &&
                    (p.color?.value || "") === (item.color?.value || "")
            );

            if (index !== -1) {
                const updated = [...prev];
                updated[index].quantity += quantity;
                return updated;
            }

            return [...prev, item];
        });
    };

    const updateQuantity = (slug, size, colorValue, delta) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.slug === slug &&
                    item.size === size &&
                    (item.color?.value || "") === (colorValue || "")
                        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (slug, size, colorValue) => {
        setCart((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.slug === slug &&
                        item.size === size &&
                        (item.color?.value || "") === (colorValue || "")
                    )
            )
        );
    };

    const clearCart = () => setCart([]);
    const saveCheckoutInfo = (info) => {
        setCheckoutInfo(info);
        localStorage.setItem("checkoutInfo", JSON.stringify(info));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                checkoutInfo,
                saveCheckoutInfo
            }}
        >
            {children}
        </CartContext.Provider>
    );
};