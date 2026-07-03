
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
        <footer className="bg-[#f6f6f3] border-t border-gray-200">

            <div className="max-w-6xl mx-auto px-6 py-14">

                {/* TOP INFO STRIP */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14 text-sm text-gray-600">

                    <div className="space-y-3">
                        <FaTruck className="text-black" size={18} />
                        <h5 className="font-semibold tracking-wide text-black">Shipping</h5>
                        <p>Delivered in 2–5 business days.</p>
                        <p className="text-gray-500">R90 / Free over R900</p>
                    </div>

                    <div className="space-y-3">
                        <FaUndoAlt className="text-black" size={18} />
                        <h5 className="font-semibold tracking-wide text-black">Returns</h5>
                        <p>Easy online returns process.</p>
                        <p className="text-gray-500">Return within policy window</p>
                    </div>

                    <div className="space-y-3">
                        <FaHeadset className="text-black" size={18} />
                        <h5 className="font-semibold tracking-wide text-black">Support</h5>
                        <p>Customer support when you need it.</p>
                        <p className="text-gray-500">FAQ & Live assistance</p>
                    </div>

                    <div className="space-y-3">
                        <FaCreditCard className="text-black" size={18} />
                        <h5 className="font-semibold tracking-wide text-black">
                            Secure Payments
                        </h5>
                        <p>Multiple payment options available.</p>
                        <p className="text-gray-500">
                            Card • EFT • Apple Pay • PayPal
                        </p>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 mb-12"></div>

                {/* QUICK LINKS */}
                <div className="mb-12">

                    <h4 className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6 text-center">
                        Explore
                    </h4>

                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-6 text-center">
                        {quicklinks.map((link) => (
                            <li key={link.slug}>
                                <a
                                    href={`/${link.slug}`}
                                    className="text-sm text-gray-600 hover:text-black transition"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="flex justify-center gap-8 mb-10">

                    {/* FACEBOOK */}
                    <a
                        href="https://www.facebook.com/share/14a9ALGpPJq/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1877F2] hover:scale-110 transition"
                    >
                        <FaFacebookF size={18} />
                    </a>

                    {/* INSTAGRAM */}
                    <a
                        href="https://www.instagram.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E4405F] hover:scale-110 transition"
                    >
                        <FaInstagram size={18} />
                    </a>

                    {/* X (TWITTER) */}
                    <a
                        href="https://twitter.com/yourpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:opacity-70 transition"
                    >
                        <FaXTwitter size={18} />
                    </a>

                </div>

                {/* COPYRIGHT */}
                <div className="text-center border-t border-gray-200 pt-6">
                    <p className="text-xs tracking-wide text-gray-500">
                        © {new Date().getFullYear()} KAVANTI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;