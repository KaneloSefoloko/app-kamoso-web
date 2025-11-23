import { useContext } from 'react';
import { CartContext } from './CartContext';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
    const { cart } = useContext(CartContext);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex justify-end p-4">
            <div className="relative">
                <FiShoppingCart size={28} />
                {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {count}
          </span>
                )}
            </div>
        </div>
    );
};