import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

const Hero = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [slides, setSlides] = useState({ web: [], mobile: [] });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchSlides = async () => {
            const webSnapshot = await getDocs(collection(db, "Web Images"));
            const mobileSnapshot = await getDocs(collection(db, "mobile image"));
            const webSlides = webSnapshot.docs.map(doc => doc.data());
            const mobileSlides = mobileSnapshot.docs.map(doc => doc.data());
            setSlides({ web: webSlides, mobile: mobileSlides });
        };
        fetchSlides();
    }, []);

    const activeSlides = isMobile && slides.mobile.length > 0 ? slides.mobile : slides.web;

    useEffect(() => {
        if (activeSlides.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % activeSlides.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [activeSlides.length]);

    if (activeSlides.length === 0) return <div>Loading...</div>;

    const currentSlide = activeSlides[currentIndex];
    const optimizedSrc = `${currentSlide.src}?w=${isMobile ? 600 : 1200}&c=fill&q=auto&f=auto`;

    return (
        <div className="relative">
            <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center text-white">
                {currentSlide.type === "image" ? (
                    <img
                        src={optimizedSrc}
                        alt={currentSlide.label}
                        className="absolute inset-0 w-full h-full object-cover bg-black z-0 transition-opacity duration-1000 ease-in-out"
                        key={currentIndex}
                    />
                ) : (
                    <video
                        src={currentSlide.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover bg-black z-0"
                        key={currentIndex}
                    />
                )}

                <button
                    onClick={() => navigate(currentSlide.link)}
                    className={`font-sans antialiased md:subpixel-antialiased z-10 px-8 py-4 rounded-md text-base font-light tracking-widest border border-white hover:bg-white hover:text-black transition mt-[540px] mb-8 animate-[slideIn_0.8s_ease-out_forwards] ${
                        isMobile ? "text-black bg-white" : "bg-transparent text-white"
                    }`}
                >
                    {currentSlide.label}
                </button>
            </section>

            <button
                onClick={() => document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" })}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-white text-black w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:bg-gray-200 transition font-light text-xl hover:animate-bounce"
            >
                ↓
            </button>
        </div>
    );
};

export default Hero;