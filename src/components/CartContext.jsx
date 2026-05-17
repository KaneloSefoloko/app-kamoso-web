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

    const addToCart = (item) => {
        if (!item) return;

        const selected =
            item.variant ||
            item.selectedVariant ||
            item.variants?.find(
                (v) => v.color?.value === item.selectedColor
            ) ||
            item.variants?.[0] ||
            item;

        const normalizedSize =
            typeof item.size === "object"
                ? item.size?.size
                : item.size || "ONE_SIZE";

        const cartItem = {
            slug: item.slug,
            name: item.name,
            image: selected.image || item.image,
            price: selected.price || item.price,
            size: normalizedSize,
            quantity: item.quantity || 1,
            color: selected.color || null,
        };

        setCart((prev) => {
            const index = prev.findIndex(
                (p) =>
                    p.slug === cartItem.slug &&
                    p.size === cartItem.size &&
                    (p.color?.value || "") === (cartItem.color?.value || "")
            );

            if (index !== -1) {
                const updated = [...prev];
                updated[index].quantity += cartItem.quantity;
                return updated;
            }

            return [...prev, cartItem];
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