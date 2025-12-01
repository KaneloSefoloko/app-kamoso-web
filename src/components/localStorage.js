const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
