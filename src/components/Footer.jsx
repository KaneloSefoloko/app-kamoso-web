
import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FaHeadset, FaTruck, FaCreditCard, FaUndoAlt } from 'react-icons/fa';

const Footer = () => {
    const quicklinks = [
        { label: 'FAQ’s', slug: 'faqs' },
        { label: 'Track my Order', slug: 'track-my-order' },
        { label: 'Log a Return', slug: 'return' },
        { label: 'Returns Policy', slug: 'returns-policy' },
        { label: 'Shipping', slug: 'shipping' },
        { label: 'Collection', slug: 'collection' },
        { label: 'Payments', slug: 'payments' },
        { label: 'Contact Us', slug: 'contact' },
        { label: 'Careers & Opportunities', slug: 'careers-opportunities' },
        { label: 'Blog | Gazette', slug: 'blog-gazette' },
        { label: 'Our Story', slug: 'our-story' },
        { label: 'Gallery', slug: 'gallery' },
    ];

    return (
        <footer className="bg-gray-100 text-center py-10 mt-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Info Section with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 text-left text-sm text-gray-700">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <FaTruck size={24} className="text-black" />
                        <div className="space-y-2">
                            <h5 className="font-semibold">SHIPPING</h5>
                            <p>Delivered in 2-5 business days.</p>
                            <p>R90 / Free over R900</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <FaUndoAlt size={24} className="text-black" />
                        <div className="space-y-2">
                            <h5 className="font-semibold">RETURNS</h5>
                            <p>You can return online orders here.</p>
                            <p>FAQ's | Log a Return</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <FaHeadset size={24} className="text-black" />
                        <div className="space-y-2">
                            <h5 className="font-semibold">SUPPORT</h5>
                            <p>We uphold the Consumer Goods and Services Code.</p>
                            <p>FAQ's | CGSO PARTICIPANT</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <FaCreditCard size={24} className="text-black" />
                        <div className="space-y-2">
                            <h5 className="font-semibold">EXPRESS PAYMENTS</h5>
                            <p>Capitec Pay |Apple Pay |Google Pay|PayPal</p>
                        </div>
                    </div>
                </div>

                {/* Quicklinks */}
                <h4 className="text-lg font-semibold mb-6 text-center">Quicklinks</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-center mb-6">
                    {quicklinks.map((link) => (
                        <li key={link.slug}>
                            <a
                                href={`/${link.slug}`} className="text-gray-700 hover:text-black text-sm"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="https://www.facebook.com/share/17GGxNBvUi/?mibextid=wwXlfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaFacebookF size={20} />
                    </a>
                    <a
                        href="https://www.instagram.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-500 transition"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="https://twitter.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition"
                    >
                        <FaXTwitter size={20} />
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm text-gray-600">
                    &copy; 2025 KAVANTI. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;