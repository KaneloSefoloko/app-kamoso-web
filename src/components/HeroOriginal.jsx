import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";

// Debounce helper for resize
function debounce(fn, delay = 150) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

// Build a Cloudinary URL with best-practice params
function makeCloudinaryUrl(baseSrc, { width }) {
    try {
        const u = new URL(baseSrc);
        const isImage = u.pathname.includes("/image/upload/");
        const isVideo = u.pathname.includes("/video/upload/");
        const transform = isImage
            ? `c_fill,g_auto,w_${width},dpr_auto,f_auto,q_auto`
            : `f_auto,q_auto,br_auto`;

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
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState({ web: [], mobile: [] });
    const [viewportW, setViewportW] = useState(() => window.innerWidth);
    const isMobile = viewportW < 768;
    const timerRef = useRef(null);

    // Debounced resize
    useEffect(() => {
        const onResize = debounce(() => setViewportW(window.innerWidth), 150);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Fetch slides once and cache them in memory
    useEffect(() => {
        const loadSlides = async () => {
            // If slides already exist in memory, no need to fetch again
            if (slides.web.length > 0 && slides.mobile.length > 0) return;

            let isMounted = true;
            try {
                const webSnapshot = await getDocs(collection(db, "Web Images"));
                const mobileSnapshot = await getDocs(collection(db, "mobile image"));
                const webSlides = webSnapshot.docs.map((doc) => doc.data());
                const mobileSlides = mobileSnapshot.docs.map((doc) => doc.data());

                // Update state with fetched slides
                if (isMounted) {
                    setSlides({ web: webSlides, mobile: mobileSlides });
                }
            } catch (e) {
                console.error("Hero: failed to fetch slides", e);
            }
        };

        loadSlides();

        return () => {
            // Clean up to avoid memory leaks
        };
    }, [slides]);

    // Choose active set (mobile if available)
    const activeSlides = useMemo(() => {
        const mobile = slides.mobile?.length ? slides.mobile : null;
        return isMobile && mobile ? mobile : slides.web || [];
    }, [slides, isMobile]);

    // Start the slider once we have slides
    useEffect(() => {
        if (!activeSlides.length) return;
        // rotate every 5s
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
        }, 5000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeSlides.length]);

    if (!activeSlides.length) {
        return (
            <div className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center text-white">
                <span className="opacity-75">Loading…</span>
            </div>
        );
    }

    const currentSlide = activeSlides[currentIndex];

    // Responsive widths for srcset
    const widths = isMobile ? [360, 600, 768] : [800, 1200, 1600];
    const srcSet = widths
        .map((w) => `${makeCloudinaryUrl(currentSlide.src, { width: w })} ${w}w`)
        .join(", ");

    // Preferred display width
    const displayW = isMobile ? 600 : 1200;
    const optimizedSrc = makeCloudinaryUrl(currentSlide.src, { width: displayW });

    const isImage = currentSlide.type === "image";

    return (
        <div className="relative">
            <section className="relative min-h-[60vh] md:min-h-[80vh] w-full flex flex-col items-center justify-center text-white">
                {isImage ? (
                    <img
                        src={optimizedSrc}
                        srcSet={srcSet}
                        sizes={isMobile ? "(max-width: 768px) 600px, 768px" : "(max-width: 1200px) 1200px, 1600px"}
                        alt={currentSlide.label || "Hero image"}
                        loading={currentIndex === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover bg-black z-0 transition-opacity duration-700 ease-in-out"
                        key={`img-${currentIndex}`}
                    />
                ) : (
                    <video
                        key={`vid-${currentIndex}`}
                        className="absolute inset-0 w-full h-full object-cover bg-black z-0"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload={currentIndex === 0 ? 'auto' : 'metadata'}
                        src={makeCloudinaryUrl(currentSlide.src, { width: 1920 })}
                        poster={makeCloudinaryUrl(currentSlide.poster || currentSlide.src, { width: 1920 })}
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
                onClick={() =>
                    document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 bg-white text-black w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md hover:bg-gray-200 transition font-light text-xl hover:animate-bounce"
            >
                ↓
            </button>
        </div>
    );
};

export default Hero;
