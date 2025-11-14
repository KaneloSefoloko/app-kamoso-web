import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const slides = [
        { image: '/assets/gala.png', label: 'Shop Kavanti Bags', link: '/products/seraphin-bag' },
        { image: '/assets/hero_image.png', label: 'Shop Summer Glasses', link: '/products/retro-glasses' },
        { image: '/assets/mtho_2.svg', label: 'Shop T-Shirts', link: '/products/classic-tee' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentSlide = slides[currentImageIndex];

    const scrollToNextSection = () => {
        const section = document.getElementById('next-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center text-white">
                {/* Background Image */}
                <img
                    src={currentSlide.image}
                    alt={`Slide ${currentImageIndex}`}
                    className="absolute inset-0 w-full h-full object-contain md:object-cover bg-black z-0 transition-opacity duration-1000 ease-in-out"
                    key={currentImageIndex}
                />
                <button
                    onClick={() => navigate(currentSlide.link)}
                    className="z-10 bg-transparent text-white px-18 py-4 rounded-md text-sm font-large border border-white hover:bg-white hover:text-black transition mt-[540px] mb-8"
                >
                    {currentSlide.label}
                </button>
            </section>

            {/* Scroll Down Button (Overlay) */}
            <button
                onClick={scrollToNextSection}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-[9999] bg-white text-black w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:bg-gray-200 transition text-xl hover:animate-bounce"
            >
                ↓
            </button>
        </div>
    );
};

export default Hero;