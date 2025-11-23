import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { products } from '../data/products';

const ProductPage = () => {
    const { productSlug } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(p => p.slug === productSlug);
        setProduct(foundProduct || null);
        setMainImage(foundProduct?.image || null);
        if (foundProduct?.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
    }, [productSlug]);

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center">
                <p className="text-lg">Product not found.</p>
                <Link to="/" className="mt-4 inline-block text-sm text-gray-600 underline">Back to Home</Link>
            </div>
        );
    }

    const inStock = product.inStock ?? true;
    const thumbnails = product.gallery?.length
        ? product.gallery
        : [product.hoverImage, product.image].filter(Boolean);

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes?.length) {
            alert('Please select a size.');
            return;
        }
        addToCart({ ...product, quantity, size: selectedSize });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <nav className="text-sm text-gray-500 mb-3">
                <ol className="flex flex-wrap gap-1">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li>/</li>
                    <li><Link to="/apparel" className="hover:underline">Apparel</Link></li>
                    <li>/</li>
                    <li className="text-gray-800">{product.name}</li>
                </ol>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Image + thumbnails */}
                <div>
                    <div className="w-full bg-white rounded border">
                        <img src={mainImage || product.image} alt={product.name} className="w-full h-auto object-cover rounded"/>
                    </div>

                    {thumbnails?.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {thumbnails.map((src, idx) => (
                                <button key={idx} onClick={() => setMainImage(src)} className={`border rounded overflow-hidden ${mainImage === src ? 'ring-2 ring-black' : ''}`}>
                                    <img src={src} alt={`${product.name} ${idx + 1}`} className="w-full h-auto object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Purchase panel */}
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xl sm:text-2xl font-semibold">R{product.price}</p>
                        <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
              {inStock ? 'In stock' : 'Out of stock'}
            </span>
                    </div>

                    {product.color && (<p className="mt-2 text-sm text-gray-600">Color: {product.color}</p>)}

                    {product.sizes?.length > 0 && (
                        <div className="mt-5">
                            <p className="font-semibold mb-2">Select Size:</p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map(size => {
                                    const disabled = product.unavailableSizes?.includes(size);
                                    return (
                                        <button key={size} disabled={disabled} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded text-sm sm:text-base transition ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}>
                                            {size}</button>
                                    );
                                })}
                            </div>
                            <button className="mt-2 text-sm text-gray-600 underline" onClick={() => alert('Size guide coming soon')}>Size Guide</button>
                        </div>
                    )}

                    <div className="mt-4">
                        <p className="font-semibold mb-2">Quantity:</p>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 border rounded">-</button>
                            <span className="min-w-[2ch] text-center">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 border rounded">+</button>
                        </div>
                    </div>

                    <button onClick={handleAddToCart} disabled={!inStock} className={`mt-6 w-full sm:w-auto bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}>Add to Cart</button>
                    <div className="mt-8">
                        <div className="flex gap-4 border-b pb-2 text-sm sm:text-base">
                            {['details', 'shipping', 'returns'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 border-b-2 transition ${activeTab === tab ? 'border-black font-semibold' : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}>
                                    {tab === 'details' ? 'Details' : tab === 'shipping' ? 'Shipping' : 'Returns'}
                                </button>
                            ))}
                        </div>

                        <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                            {activeTab === 'details' && (
                                <div>
                                    <p>{product.description || 'Premium quality apparel.'}</p>
                                    {product.highlights?.length && (
                                        <ul className="mt-3 list-disc pl-5">
                                            {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                        </ul>
                                    )}
                                    {product.care?.length && (
                                        <div className="mt-3">
                                            <p className="font-semibold">Care</p>
                                            <ul className="list-disc pl-5">
                                                {product.care.map((c, i) => <li key={i}>{c}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'shipping' && (
                                <div>
                                    <p>Standard delivery: 2–5 business days within South Africa.</p>
                                    <p className="mt-2">Express options available at checkout.</p>
                                </div>
                            )}

                            {activeTab === 'returns' && (
                                <div>
                                    <p>Hassle-free returns within 14 days of delivery if unworn and in original packaging.</p>
                                    <p className="mt-2">See full returns policy at checkout.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="border rounded p-3">Secure Checkout</div>
                        <div className="border rounded p-3">Fast Delivery</div>
                        <div className="border rounded p-3">Easy Returns</div>
                    </div>
                </div>
            </div>

            {product.related?.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">You may also like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {product.related.map(rel => (
                            <Link key={rel.slug} to={`/products/${rel.slug}`} className="group border rounded overflow-hidden">
                                <img src={rel.image} alt={rel.name} className="w-full h-auto object-cover" />
                                <div className="p-3">
                                    <p className="font-medium group-hover:underline">{rel.name}</p>
                                    <p className="text-sm text-gray-600">R{rel.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;