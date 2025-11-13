import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    FiShoppingCart,
    FiSearch,
    FiMenu,
    FiX,
    FiUser,
    FiChevronRight
} from 'react-icons/fi';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const navItems = ['NEW', 'PROMOS', 'APPAREL', 'ACCESSORIES', 'FOOTWEAR'];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isNotHome = location.pathname !== '/';
    const navBg = scrolled || isNotHome ? 'bg-black' : 'bg-transparent hover:bg-black';

    return (
        <nav className={`mt-8 fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-2 flex items-center justify-between transition-colors duration-300 ${navBg}`}>

            {/* Left Section */}
            <div className="flex items-center gap-4 md:gap-12 flex-shrink-0">
                <button className="md:hidden" onClick={() => setMenuOpen(true)}>
                    <FiMenu size={24} className="text-white" />
                </button>
                <img src="/assets/KavantiLogo.svg" alt="Logo" className="h-40 w-auto" />
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex flex-grow justify-center gap-6 text-sm font-light text-white">
                {navItems.map((item) => {
                    // <Link
                    //     key={item}
                    //     href={`#${item.toLowerCase()}`}
                    //     className="relative text-white transition-all duration-300 hover:text-white hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-[-1.5rem] hover:after:w-full hover:after:h-0.5 hover:after:bg-white"
                    // >
                    //     {item}
                    // </Link>
                    return (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`} // Adjust this path to match your route
                            className="relative text-white transition-all duration-300 hover:text-white hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-[-1.5rem] hover:after:w-full hover:after:h-0.5 hover:after:bg-white"
                        >
                            {item}
                        </Link>
                    )
                })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <FiUser size={24} className="cursor-pointer text-white" />
                <FiSearch size={24} className="cursor-pointer text-white" />
                <FiShoppingCart size={24} className="cursor-pointer text-yellow-400" />
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gray-100 border-r z-40 transform transition-transform duration-300 ease-in-out ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
                style={{ borderColor: 'rgb(206, 206, 206)' }}
            >
                <div
                    className="flex justify-between items-center p-4 border-b"
                    style={{ borderColor: 'rgb(206, 206, 206)' }}
                >
                    <div className="text-xl font-bold tracking-wide"></div>
                    <button onClick={() => setMenuOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                {/*<ul className="flex flex-col p-4 gap-4 text-sm font-medium">*/}
                {/*    {navItems.map((item) => (*/}
                {/*        <li*/}
                {/*            key={item}*/}
                {/*            className="border-b pb-4"*/}
                {/*            style={{ borderColor: 'rgb(206, 206, 206)' }}*/}
                {/*        >*/}
                {/*            <button*/}
                {/*                onClick={() => setMenuOpen(false)}*/}
                {/*                className="w-full flex justify-between items-center text-left"*/}
                {/*            >*/}
                {/*                {item}*/}
                {/*                <FiChevronRight size={20} />*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                <ul className="flex flex-col p-4 gap-4 text-sm font-medium">
                    {navItems.map(function (item) {
                        return (
                            <li
                                key={item}
                                className="border-b pb-4"
                                style={{ borderColor: 'rgb(206, 206, 206)' }}
                            >
                                <Link
                                    to={`/${item.toLowerCase()}`} // Adjust this path to match your route
                                    onClick={() => setMenuOpen(false)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    {item}
                                    <FiChevronRight size={20} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div
                    className="absolute bottom-0 w-full p-4 border-t"
                    style={{ borderColor: 'rgb(206, 206, 206)' }}
                >
                    {/*<button*/}
                    {/*    onClick={() => setMenuOpen(false)}*/}
                    {/*    className="w-full flex justify-between items-center text-left"*/}
                    {/*>*/}
                    {/*    <span className="flex items-center gap-2">*/}
                    {/*        <FiUser />*/}
                    {/*        LOGIN*/}
                    {/*    </span>*/}
                    {/*</button>*/}

                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex justify-between items-center text-left"
                    >
                        <span className="flex items-center gap-2">
                            <FiUser />
                            LOGIN
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;