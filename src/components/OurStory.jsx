import React from "react";
import {motion} from "framer-motion";

const values = [
    {
        title: "Quality",
        text: "Quality over quantity equates to longevity.",
    },
    {
        title: "Teamwork",
        text: "A collaborative effort is a lucrative effort.",
    },
    {
        title: "Customer Service",
        text: "We serve beyond fashion.",
    },
];

const OurStory = () => {
    return (
        <div className="bg-[#f8f8f6] text-black overflow-hidden">

            {/* HERO */}
            <section
                className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-[#f8f8f6] flex items-center justify-center">

                {/* SIGNATURE */}
                <img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1775855831/signature_wt5dpo.svg"
                    alt="Kavanti Signature"
                    className="
        w-[105vw]
        md:w-[85vw]
        max-w-none
        h-auto
        object-contain
        opacity-[0.08]
        select-none
        pointer-events-none
        translate-y-10
        md:translate-y-16
    "
                />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="uppercase tracking-[0.3em] text-sm text-black/60 mb-4">
                        KAVANTI
                    </p>

                    <h1 className="text-5xl md:text-7xl font-light leading-tight">
                        Our Story
                    </h1>
                    <p className="text-black/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Built from ambition, identity, and the courage
                        to stand out without permission.
                    </p>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="py-24 px-5 md:px-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT IMAGE */}
                    <motion.div
                        initial={{opacity: 0, x: -40}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                        className="relative"
                    >
                        <img
                            src="/assets/Image.png"
                            alt="Kavanti Story"
                            className="relative rounded-[2rem] w-[80%] md:w-[70%] mx-auto h-[420px] object-contain shadow-2xl"
                        />
                    </motion.div>

                    {/* RIGHT TEXT */}
                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                    >
                        <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-4">
                            Since 2023
                        </p>

                        <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                            More Than Clothing
                        </h2>

                        <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg font-light">
                            <p>
                                Kavanti was born in the middle of the kasi noise
                                — founded in 2023 by Kanelo Sefoloko —
                                where dreams often feel bigger than the chances
                                available and far apart from the reality.
                            </p>

                            <p>
                                The name stands for those who choose to rise anyway.
                                Our designers are inspired by the streets we grew up on,
                                the township culture, music, ambition,
                                and everyday resilience, Kavanti represents
                                identity, purpose, and confidence.
                            </p>

                            <p>
                                This is for the ones building something greater
                                day by day. The ones who move with quiet
                                confidence while leaving a mark everywhere they go.
                            </p>
                            <br/>
                            <p>
                                Wear Kavanti. Don't just move through the world — leave a mark with Kavanti.
                            </p>
                        </div>

                        {/* QUOTE */}
                        <div className="mt-10 border-l-2 border-black pl-6">
                            <p className="text-2xl md:text-3xl font-light italic leading-relaxed">
                                “Today | Tomorrow | Always”
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* BANNER */}
            <section className="relative py-28 overflow-hidden">

                <div className="absolute inset-0 bg-black"/>

                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://res.cloudinary.com/dkwfi3iku/image/upload/v1775855828/Image_1_pepgbt.png')",
                    }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                        className="text-white text-4xl md:text-6xl font-light leading-tight"
                    >
                        African streetwear built
                        for self-definition.
                    </motion.h2>
                </div>
            </section>

            {/* VISION */}
            <section className="py-24 px-5 md:px-10 bg-white">

                <div className="max-w-4xl mx-auto text-center">

                    <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-4">
                        Vision
                    </p>

                    <h2 className="text-4xl md:text-5xl font-light mb-8">
                        Designed For Elevation
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-lg font-light">
                        Kavanti exists to empower individuals to stand
                        confidently as they are — expressive,
                        intentional, and unapologetic.
                        We aim to build a global streetwear identity rooted
                        in African creativity and modern aspiration.
                    </p>

                    {/* PHILOSOPHY */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">

                        {[
                            "Style is personal.",
                            "Presence is power.",
                            "Culture is not followed — it is created.",
                        ].map((item) => (
                            <motion.div
                                key={item}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5}}
                                className="bg-[#f8f8f6] rounded-3xl p-8 border border-black/5"
                            >
                                <p className="text-lg font-light leading-relaxed">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-24 px-5 md:px-10 bg-[#f8f8f6]">

                <div className="max-w-6xl mx-auto">

                    <div className="mb-16 text-center">
                        <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-4">
                            Core Values
                        </p>

                        <h2 className="text-4xl md:text-5xl font-light">
                            What Drives Us
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {values.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{opacity: 0, y: 40}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.1,
                                }}
                                className="bg-white rounded-[2rem] p-10 border border-black/5 shadow-sm hover:shadow-xl transition-opacity duration-500"
                            >
                                <div className="text-5xl font-light text-black/10 mb-6">
                                    0{i + 1}
                                </div>

                                <h3 className="text-2xl font-light mb-4">
                                    {value.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed font-light">
                                    {value.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurStory;