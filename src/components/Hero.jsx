import React from 'react';

const Hero = () => {
    const scrollToNextSection = () => {
        const section = document.getElementById('next-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative h-[80vh] w-full flex flex-col items-center justify-center text-white overflow-visible">
            {/* Background Image */}
            <img
                src="/assets/gala.png"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Shop Now Button */}
            <a
                href="/products/gxb-dome-bag"
                className="z-10 bg-transparent text-white px-18 py-4 rounded-md text-sm font-large border border-white hover:bg-white hover:text-black transition mt-130 mb-8"
            >
                Shop Dome Bag
            </a>

            {/* Scroll Down Button */}

            <button
                onClick={scrollToNextSection}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-white text-black w-16 h-16 rounded-full shadow-md hover:bg-gray-200 transition text-xl
                hover:animate-bounce"
            >
                ↓
            </button>

        </section>
    );
};

export default Hero;