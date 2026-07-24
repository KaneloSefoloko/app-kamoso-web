import React, { useEffect, useRef, useState } from "react";

const ScrollDivider = ({ targetRef}) => {
    const [visible, setVisible] = useState(false);
    const selfRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                threshold: 0.4,
            }
        );

        if (selfRef.current) {
            observer.observe(selfRef.current);
        }

        return () => {
            if (selfRef.current) {
                observer.unobserve(selfRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={selfRef}
            className={`
                flex justify-center my-4 transition-opacity duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
        >

            <button
                onClick={() =>
                    targetRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
                className="
        group relative mx-auto -mt-8 z-20
        w-16 h-16 md:w-20 md:h-20
        rounded-full

        bg-white/10 backdrop-blur-xl
        border border-white/20

        flex items-center justify-center

        shadow-[0_10px_40px_rgba(0,0,0,0.15)]

        transition-opacity duration-500 ease-out

        hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        hover:scale-110
        active:scale-95
    "
            >
    <span
        className="
            text-black text-2xl md:text-3xl
            transition-transform duration-500 ease-out
            group-hover:translate-y-1 group-hover:opacity-80
        "
    >
        ↓
    </span>

                {/* subtle glow ring */}
                <div className="
        absolute inset-0 rounded-full
        border border-white/10
        scale-110 opacity-0
        group-hover:opacity-100 group-hover:scale-125
        transition-opacity duration-500
    " />
            </button>
        </div>
    );
};

export default ScrollDivider;