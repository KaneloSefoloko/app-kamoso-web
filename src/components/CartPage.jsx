import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                            <div className="flex-1 ml-4">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>R{item.price}</p>
                            </div>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                className="w-16 border rounded text-center"
                            />
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-right mt-4 font-bold text-xl">Total: R{total}</div>
                </div>
            )}
        </div>
    );
};

export default CartPage;