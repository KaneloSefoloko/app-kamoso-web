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
                className="relative h-[40vh] md:h-[90vh] overflow-hidden bg-[#f6f6f3] flex items-center justify-center">

                {/* SIGNATURE */}
                <img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783082929/Photoroom_20260703_144807_h1boqf.png"
                    alt="Kavanti Signature"
                    className="w-[105vw] md:w-[85vw] max-w-none h-auto object-contain opacity-[0.08]
                    select-none pointer-events-none translate-y-10 md:translate-y-16"
                />

                {/* CONTENT */}

                <div className="absolute inset-0 flex flex-col items-center justify-start pt-34 md:pt-24 lg:pt-32 text-center px-6">

                <p className="mt-8 text-lg text-gray-600 max-w-2xl">
                        The evolution of a name inspired by progress,
                        vision and the ambition to build a globally
                        recognizable luxury brand.
                    </p>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="pt-2 pb-10 md:py-24 px-5 md:px-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT IMAGE */}
                    <motion.div
                        initial={{opacity: 0, x: -40}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                        className="relative">
                        <img
                            src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783188720/Photoroom_20260704_200756_omqrot.jpg"
                            alt="Kavanti Story"
                            className="w-[90%] md:w-[80%] h-[420px] mx-auto object-cover rounded-[2rem] shadow-2xl"
                        />
                    </motion.div>

                    {/* RIGHT TEXT */}
                    <motion.div
                        initial={{opacity: 0, x: 40}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}>

                        <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                            More Than Clothing
                        </h2>

                        <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg font-light">
                            <p>
                                When the brand was first launched in 2023,
                                it carried a different name  <strong>Kamoso.</strong>
                            </p>

                            <p>
                                A Sotho word associated with the future and
                                a future-forward mindset.
                            </p>

                            <p>
                                The name reflected the original vision of the
                                brand: creating something that looked ahead
                                rather than following what already existed.
                            </p>

                            <p>
                                As the vision expanded, it became clear that
                                the brand needed an identity capable of
                                connecting with a wider audience while
                                remaining true to its roots.
                            </p>

                            <h2 className="text-3xl font-light pt-8">
                                Born From A Vision
                            </h2>

                            <p>
                                Founded in 2023 by <strong>Kanelo Sefoloko</strong> —
                                KAVANTI merges contemporary fashion with timeless design,
                                creating pieces inspired by ambition, culture and individuality.
                            </p>

                            <p>
                                The vision inspired by the streets we grew up on,
                                the township culture, music, ambition,
                                and everyday resilience, Kavanti represents
                                identity, purpose, and confidence. From our local inspired designed
                                <strong> Matatiele Too Fresh</strong> to <strong>Kavanti</strong>.
                            </p>

                            <p>
                                This is for the ones building something greater
                                day by day. The ones who move with quiet
                                confidence while leaving a mark everywhere they go.
                            </p>

                            <h2 className="text-3xl font-light pt-8">
                                Inspired By Progress
                            </h2>

                            <p>
                                The inspiration came from the Italian word
                                <strong> Avanti</strong>.
                            </p>

                            <p>
                                A word associated with moving forward,
                                progress and advancement.
                            </p>

                            <p>
                                The meaning aligned perfectly with the
                                philosophy behind the brand.
                            </p>

                            <p>
                                Rather than adopting the word directly,
                                it was reimagined into something unique.
                            </p>

                            <p>
                                By introducing the letter <strong>K</strong>,
                                the name evolved into <strong>Kavanti</strong>.
                            </p>

                            <p>
                                A distinctive and memorable identity built
                                around one principle:
                            </p>

                            <div className="mt-10 border-l-2 border-black pl-6">
                                <h2 className="text-2xl md:text-3xl font-light italic leading-relaxed">
                                    More Than Fashion
                                </h2>
                            </div>

                            <p>
                                Kavanti is not simply a clothing brand.
                            </p>

                            <p>
                                It represents a mindset.
                            </p>

                            <p>
                                A belief in growth.
                            </p>

                            <p>
                                A commitment to progress.
                            </p>

                            <p>
                                The confidence to pursue a bigger vision.
                            </p>

                            <p>
                                Every collection, product and decision
                                is guided by those values.
                            </p>

                            <div className="mt-10 border-l-2 border-black pl-6">
                                <h2 className="text-2xl md:text-3xl font-light italic leading-relaxed">
                                    Future Forward
                                </h2>
                            </div>

                            <p>
                                The meaning of Kavanti can be understood
                                through three ideas:
                            </p>

                            <ul className="space-y-3 pl-6 list-disc">
                                <li>Future Forward</li>
                                <li>Lead With Vision</li>
                                <li>Move With Confidence</li>
                            </ul>
                        </div>

                        {/* QUOTE */}
                        <p className="text-2xl md:text-3xl font-light italic leading-relaxed">
                            “Today | Tomorrow | Always”
                        </p>
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
                        Global fashion built
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
                        We aim to build a global fashion identity rooted
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