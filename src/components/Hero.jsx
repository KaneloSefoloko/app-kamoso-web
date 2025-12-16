// src/components/Hero.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

// --- Cloudinary URL helper ---
function makeCloudinaryUrl(baseSrc, { width }) {
    try {
        const u = new URL(baseSrc);
        u.pathname = u.pathname.replace(
            /\/image\/upload\/?/,
            `/image/upload/c_fill,g_auto,w_${width},dpr_auto,f_auto,q_auto/`
        );
        return u.toString();
    } catch {
        return `${baseSrc}?w=${width}`;
    }
}

// Debounce helper
function debounce(fn, delay = 150) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

const Hero = () => {
    // ---------------- HOOKS ----------------
    const [isReady, setIsReady] = useState(false);
    const [slides, setSlides] = useState({ web: [], mobile: [] });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewportW, setViewportW] = useState(() => window.innerWidth);

    const navigate = useNavigate();
    const timerRef = useRef(null);
    const nextSectionRef = useRef(null);

    const isMobile = viewportW < 768;

    // ---------------- EFFECTS ----------------
    const onResize = useMemo(
        () => debounce(() => setViewportW(window.innerWidth), 150),
        []
    );

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    // Fetch slides (IMAGE ONLY)
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const webSnap = await getDocs(collection(db, "Web Images"));
                const mobileSnap = await getDocs(collection(db, "mobile image"));

                if (!mounted) return;

                setSlides({
                    web: webSnap.docs.map(d => d.data()),
                    mobile: mobileSnap.docs.map(d => d.data())
                });

                setIsReady(true);
            } catch (err) {
                console.error("Hero load failed:", err);
                setIsReady(true);
            }
        })();

        return () => (mounted = false);
    }, []);

    // Determine slides
    const activeSlides = useMemo(() => {
        return isMobile && slides.mobile.length
            ? slides.mobile
            : slides.web;
    }, [slides, isMobile]);

    // Auto rotation
    useEffect(() => {
        if (!activeSlides.length) return;

        timerRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % activeSlides.length);
        }, 5000);

        return () => clearInterval(timerRef.current);
    }, [activeSlides.length]);

    // ---------- LOADING ----------
    if (!isReady) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <p className="mt-6 text-lg tracking-widest animate-pulse">
                    Loading experience…
                </p>
            </div>
        );
    }

    if (!activeSlides.length) {
        return null;
    }

    // ---------- SLIDE DATA ----------
    const currentSlide = activeSlides[currentIndex];
    const widths = isMobile ? [360, 600, 768] : [800, 1200, 1600];
    const srcSet = widths
        .map(w => `${makeCloudinaryUrl(currentSlide.src, { width: w })} ${w}w`)
        .join(", ");
    const displayW = isMobile ? 600 : 1200;
    const optimizedSrc = makeCloudinaryUrl(currentSlide.src, { width: displayW });

    return (
        <>
            {/* HERO SECTION */}
            <div className="relative">
                <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center text-white">
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            key={`img-${currentIndex}`}
                            src={optimizedSrc}
                            srcSet={srcSet}
                            sizes={
                                isMobile
                                    ? "(max-width: 768px) 600px, 768px"
                                    : "(max-width: 1200px) 1200px, 1600px"
                            }
                            alt={currentSlide.label || "Hero image"}
                            loading={currentIndex === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-1000"
                        />
                    </div>

                    <button
                        onClick={() => navigate(currentSlide.link)}
                        className={`z-10 px-8 py-4 rounded-sm text-base font-light tracking-widest border border-white hover:bg-white hover:text-black transition mt-[540px] mb-8 ${
                            isMobile ? "bg-white text-black" : "bg-transparent text-white"
                        }`}
                    >
                        {currentSlide.label}
                    </button>
                </section>

                {/* Scroll-down */}
                <button
                    onClick={() =>
                        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 bg-white text-black w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:bg-gray-200 transition text-xl hover:animate-bounce"
                >
                    ↓
                </button>
            </div>

            {/* NEXT SECTION */}
            <section
                ref={nextSectionRef}
                className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 pt-24 md:pt-32"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                    Discover Our Latest Collection
                </h2>

                <p className="max-w-2xl text-center text-gray-700 mb-12">
                    Explore our curated selection of new arrivals. Find the perfect streetwear,
                    casual, or accessory pieces to elevate your style.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
                    <CategoryCard src="/assets/BlackAndWhite.svg" title="Streetwear" />
                    <CategoryCard src="/assets/design.svg" title="Casual" />
                    <CategoryCard src="/assets/kamoso-sunglasses.jpeg" title="Accessories" />
                </div>
            </section>
        </>
    );
};

const CategoryCard = ({ src, title }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
        <img src={src} alt={title} className="w-full h-60 object-contain" />
        <div className="p-4 text-center">
            <h3 className="font-semibold text-lg">{title}</h3>
        </div>
    </div>
);

export default Hero;
