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
            <h1 className="text-xl font-light mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={`${item.id}-${item.size}`}
                            className="flex items-center justify-between border-b py-4 gap-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover"
                            />

                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">
                                    Size: {item.size}
                                </p>
                                <p className="text-sm">R{item.price}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(item.id, item.size, -1)
                                    }
                                    className="px-2 py-1 border rounded"
                                >
                                    −
                                </button>

                                <span className="w-6 text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        updateQuantity(item.id, item.size, 1)
                                    }
                                    className="px-2 py-1 border rounded"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() =>
                                    removeFromCart(item.id, item.size)
                                }
                                className="text-red-500 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="text-right mt-6 font-bold text-xl">
                        Total: R{total}
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
