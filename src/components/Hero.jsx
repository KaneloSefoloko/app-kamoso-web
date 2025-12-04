// src/components/Hero.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

// --- Preload Helper ---
function preloadAsset(url, type = "image") {
    return new Promise((resolve, reject) => {
        if (type === "image") {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
        } else {
            const video = document.createElement("video");
            video.src = url;
            video.preload = "auto";
            video.onloadeddata = resolve;
            video.onerror = reject;
        }
    });
}

// Debounce helper
function debounce(fn, delay = 150) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

// Cloudinary URL helper
function makeCloudinaryUrl(baseSrc, { width }) {
    try {
        const u = new URL(baseSrc);
        const isImage = u.pathname.includes("/image/upload/");
        const transform = isImage
            ? `c_fill,g_auto,w_${width},dpr_auto,f_auto,q_auto`
            : `vc_auto,q_auto`;

        u.pathname = u.pathname.replace(
            /(\/(image|video)\/upload)\/?/,
            `$1/${transform}/`
        );
        return u.toString();
    } catch {
        return `${baseSrc}?w=${width}&c=fill&g=auto&dpr=auto&f=auto&q=auto`;
    }
}

const Hero = () => {
    // ---------------- HOOKS ----------------
    const [isReady, setIsReady] = useState(false);
    const [isAlive, setIsAlive] = useState(true);
    const [slides, setSlides] = useState({ web: [], mobile: [] });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewportW, setViewportW] = useState(() => window.innerWidth);

    const navigate = useNavigate();
    const timerRef = useRef(null);
    const nextSectionRef = useRef(null);
    const isMobile = viewportW < 768;

    // ---------------- EFFECTS ----------------
    // Handle window resize
    useEffect(() => {
        const onResize = debounce(() => setViewportW(window.innerWidth), 150);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Fetch slides from Firebase + preload
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const webSnap = await getDocs(collection(db, "Web Images"));
                const mobileSnap = await getDocs(collection(db, "mobile image"));

                const webSlides = webSnap.docs.map(d => d.data());
                const mobileSlides = mobileSnap.docs.map(d => d.data());
                const allSlides = [...webSlides, ...mobileSlides];

                if (!mounted) return;

                // Preload all assets
                await Promise.all(
                    allSlides.map(sl =>
                        preloadAsset(makeCloudinaryUrl(sl.src, { width: 1200 }), sl.type)
                    )
                );

                if (!mounted) return;

                setSlides({ web: webSlides, mobile: mobileSlides });
                setIsReady(true);
                setIsAlive(true);
            } catch (err) {
                console.error("Hero preload failed:", err);
                setIsAlive(false);
            }
        })();

        return () => (mounted = false);
    }, []);

    // Determine which slides to use
    const activeSlides = useMemo(() => {
        const mobileSlides = slides.mobile?.length ? slides.mobile : null;
        return isMobile && mobileSlides ? mobileSlides : slides.web || [];
    }, [slides, isMobile]);

    // Slider rotation with fade
    useEffect(() => {
        if (!activeSlides.length) return;
        timerRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % activeSlides.length);
        }, 5000);

        return () => clearInterval(timerRef.current);
    }, [activeSlides.length]);

    // ---------- EARLY RENDER STATES ----------
    if (!isReady) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-lg tracking-widest animate-pulse">Loading experience…</p>
            </div>
        );
    }

    if (!isAlive) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-6">Could not load media.</p>
                <button
                    onClick={() => location.reload()}
                    className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!activeSlides.length) {
        return (
            <div className="w-full h-screen bg-black flex items-center justify-center text-white">
                No hero content found.
            </div>
        );
    }

    // ---------- SLIDE DATA ----------
    const currentSlide = activeSlides[currentIndex];
    const widths = isMobile ? [360, 600, 768] : [800, 1200, 1600];
    const srcSet = widths
        .map(w => `${makeCloudinaryUrl(currentSlide.src, { width: w })} ${w}w`)
        .join(", ");
    const displayW = isMobile ? 600 : 1200;
    const optimizedSrc = makeCloudinaryUrl(currentSlide.src, { width: displayW });
    const isImage = currentSlide.type === "image";

    return (
        <>
            {/* HERO SECTION */}
            <div className="relative">
                <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center text-white">
                    {/* Fade transition wrapper */}
                    <div className="absolute inset-0 w-full h-full">
                        {isImage ? (
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
                                className="absolute inset-0 w-full h-full object-cover bg-black z-0 transition-opacity duration-1000 ease-in-out opacity-100"
                            />
                        ) : (
                            <video
                                key={`vid-${currentIndex}`}
                                className="absolute inset-0 w-full h-full object-cover bg-black z-0 transition-opacity duration-1000 ease-in-out opacity-100"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload={currentIndex === 0 ? "auto" : "metadata"}
                                src={optimizedSrc}
                                poster={makeCloudinaryUrl(currentSlide.poster || currentSlide.src, { width: displayW })}
                            />
                        )}
                    </div>

                    <button
                        onClick={() => navigate(currentSlide.link)}
                        className={`z-10 px-8 py-4 rounded-md text-base font-light tracking-widest border border-white hover:bg-white hover:text-black transition mt-[540px] mb-8 ${
                            isMobile ? "text-black bg-white" : "bg-transparent text-white"
                        }`}
                    >
                        {currentSlide.label}
                    </button>
                </section>

                {/* Scroll-down button */}
                <button
                    onClick={() => nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-white text-black w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:bg-gray-200 transition font-light text-xl hover:animate-bounce"
                >
                    ↓
                </button>
            </div>

            {/* NEXT SECTION */}
            <section
                ref={nextSectionRef}
                className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-10 lg:px-20"
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
                    <CategoryCard src="/assets/Positive.svg" title="Accessories" />
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