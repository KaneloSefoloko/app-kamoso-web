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
            /\/image\/upload\/.*?\/v(\d+)\//,
            `/image/upload/c_fit,w_${width},dpr_auto,f_auto,q_auto/v$1/`
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
    const sanitizeSlides = (slides) =>
        slides.filter(
            (s) => s && typeof s.src === "string" && s.src.trim() !== ""
        );

    const [isReady, setIsReady] = useState(false);
    const [slides, setSlides] = useState({ web: [], mobile: [] });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewportW, setViewportW] = useState(() => window.innerWidth);

    const navigate = useNavigate();
    const timerRef = useRef(null);
    const nextSectionRef = useRef(null);

    const isMobile = viewportW < 768;

    // ---------------- RESIZE ----------------
    const onResize = useMemo(
        () => debounce(() => setViewportW(window.innerWidth), 150),
        []
    );

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    // ---------------- FETCH SLIDES (CMS) ----------------
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const snap = await getDocs(collection(db, "slides"));
                const allSlides = snap.docs.map((d) => d.data());

                if (!mounted) return;

                setSlides({
                    web: sanitizeSlides(allSlides.filter((s) => s.device === "web")),
                    mobile: sanitizeSlides(allSlides.filter((s) => s.device === "mobile")),
                });

                setIsReady(true);
            } catch (err) {
                console.error("Hero load failed:", err);
                setIsReady(true);
            }
        })();

        return () => (mounted = false);
    }, []);

    // ---------------- ACTIVE SLIDES ----------------
    const activeSlides = useMemo(() => {
        return isMobile && slides.mobile.length
            ? slides.mobile
            : slides.web;
    }, [slides, isMobile]);

    useEffect(() => {
        if (currentIndex >= activeSlides.length) {
            setCurrentIndex(0);
        }
    }, [activeSlides.length, currentIndex]);

    // ---------------- AUTO ROTATION ----------------
    useEffect(() => {
        if (!activeSlides.length) return;

        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
        }, 5000);

        return () => clearInterval(timerRef.current);
    }, [activeSlides.length]);

    // ---------------- LOADING ----------------
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

    if (!activeSlides.length || !activeSlides[currentIndex]) return null;

    // ---------------- SLIDE DATA ----------------
    const currentSlide = activeSlides[currentIndex];

    const widths = isMobile ? [360, 600, 768] : [800, 1200, 1600];

    const srcSet = widths
        .map((w) => `${makeCloudinaryUrl(currentSlide.src, { width: w })} ${w}w`)
        .join(", ");

    const displayW = isMobile ? 600 : 1200;
    const optimizedSrc = makeCloudinaryUrl(currentSlide.src, {
        width: displayW,
    });

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative min-h-[75vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden text-white">

                {/* IMAGE */}
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
                    className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <h1 className="text-sm md:text-2xl tracking-[0.3em] uppercase font-light mb-6 opacity-90">
                        {currentSlide.label}
                    </h1>

                    <button
                        onClick={() => navigate(currentSlide.link)}
                        className="
                            px-10 py-4
                            border border-white/60
                            bg-white/10 backdrop-blur-md
                            text-xs md:text-sm tracking-[0.3em] uppercase
                            hover:bg-white hover:text-black
                            transition-all duration-300
                        "
                    >
                        Shop Now
                    </button>
                </div>

                {/* SCROLL BUTTON */}
                <button
                    onClick={() =>
                        nextSectionRef.current?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                    className="
                        absolute bottom-6 left-1/2 -translate-x-1/2
                        w-12 h-12 md:w-14 md:h-14
                        rounded-full
                        bg-white/10 backdrop-blur-md
                        border border-white/20
                        text-white
                        flex items-center justify-center
                        hover:bg-white hover:text-black
                        transition
                    "
                >
                    ↓
                </button>
            </section>

            {/* NEXT SECTION */}
            <section
                ref={nextSectionRef}
                className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 pt-24 md:pt-32"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                    Discover Our Latest Collection
                </h2>

                <p className="max-w-2xl text-center text-gray-700 mb-12">
                    Explore our curated selection of new arrivals. Find the perfect
                    streetwear, casual, or accessory pieces to elevate your style.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    <CategoryCard src="/assets/BlackAndWhite.svg" title="Streetwear" />
                    <CategoryCard src="/assets/design.svg" title="Casual" />
                    <CategoryCard src="/assets/greenage-shades.jpeg" title="Accessories" />
                </div>
            </section>
        </>
    );
};

// ---------------- CATEGORY CARD ----------------
const CategoryCard = ({ src, title }) => (
    <div className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
        <img
            src={src}
            alt={title}
            className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
        <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg tracking-widest uppercase">{title}</h3>
        </div>
    </div>
);

export default Hero;