const Checkout = () => (
    <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="border p-2" />
            <input type="email" placeholder="Email" className="border p-2" />
            <input type="text" placeholder="Shipping Address" className="border p-2" />
            <button className="px-6 py-2 bg-black text-white">Place Order</button>
        </form>
    </div>
);
export default Checkout;