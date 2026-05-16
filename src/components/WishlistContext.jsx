import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    /* ADD / REMOVE TOGGLE */
    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((p) => p.id === product.id &&
                    (
                        p.selectedColor === product.selectedColor ||
                        p.variant?.color?.value === product.variant?.color?.value
                    )
            );

            if (exists) {
                return prev.filter((p) =>
                        !(
                            p.id === product.id &&
                            (
                                p.selectedColor === product.selectedColor ||
                                p.variant?.color?.value === product.variant?.color?.value
                            )
                        )
                );
            }

            return [...prev, product];
        });
    };

    /* REMOVE ONLY */
    const removeFromWishlist = (id, color) => {
        setWishlist((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.id === id &&
                        (
                            item.selectedColor === color ||
                            item.variant?.color?.value === color
                        )
                    )
            )
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};