import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [checkoutInfo, setCheckoutInfo] = useState(() => {
        const savedCheckout = localStorage.getItem("checkoutInfo");
        return savedCheckout ? JSON.parse(savedCheckout) : null;
    });

    // Persist cart
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Persist checkout info
    useEffect(() => {
        if (checkoutInfo) {
            localStorage.setItem("checkoutInfo", JSON.stringify(checkoutInfo));
        }
    }, [checkoutInfo]);

    // ✅ ADD TO CART (size is REQUIRED)
    const addToCart = (product) => {
        const size =
            product.size ??
            (product.sizes?.length === 1 ? product.sizes[0] : null);

        if (!size) {
            console.warn("Size missing for product:", product.name);
            return;
        }

        setCart((prev) => {
            const existingIndex = prev.findIndex(
                (item) =>
                    item.id === product.id &&
                    item.size === size
            );

            if (existingIndex !== -1) {
                return prev.map((item, index) =>
                    index === existingIndex
                        ? {
                            ...item,
                            quantity: item.quantity + (product.quantity || 1),
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    size,
                    quantity: product.quantity || 1,
                },
            ];
        });
    };

    // ✅ REMOVE
    const removeFromCart = (id, size) => {
        setCart((prev) =>
            prev.filter(
                (item) => !(item.id === id && item.size === size)
            )
        );
    };

    // ✅ UPDATE QUANTITY
    const updateQuantity = (id, size, delta) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + delta),
                    }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutInfo");
    };

    const saveCheckoutInfo = (info) => {
        setCheckoutInfo(info);
    };

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
