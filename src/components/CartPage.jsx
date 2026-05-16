import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-xl mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item) => {
                    const colorValue = item.color?.value || "";
                    const image =
                        item.image ||
                        item.image_url ||
                        item.images?.[0] ||
                        item.variant?.image ||
                        item.variant?.image_url ||
                        item.variants?.[0]?.image ||
                        item.variants?.[0]?.image_url ||
                        "/placeholder.png";

                    return (
                        <div
                            key={`${item.slug}-${item.size}-${colorValue}`}
                            className="flex items-center justify-between border-b py-4"
                        >
                            <img
                                src={image}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = "/placeholder.png";
                                }}
                                className="w-14 h-14 object-cover rounded cursor-pointer"
                            />

                            <div className="flex-1 ml-4">
                                <h2>{item.name}</h2>
                                <p>Size: {item.size}</p>

                                {item.color && (
                                    <p className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full border"
                                            style={{
                                                backgroundColor:
                                                    item.color.hex ||
                                                    item.color.value,
                                            }}
                                        />
                                        {item.color.name}
                                    </p>
                                )}

                                <p>R{item.price}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.slug,
                                            item.size,
                                            colorValue,
                                            -1
                                        )
                                    }
                                >
                                    −
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.slug,
                                            item.size,
                                            colorValue,
                                            1
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() =>
                                    removeFromCart(
                                        item.slug,
                                        item.size,
                                        colorValue
                                    )
                                }
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    );
                })
            )}

            <div className="text-right mt-6 font-bold">
                Total: R{total}
            </div>
        </div>
    );
};

export default CartPage;