import React from "react";
import {Link} from "react-router-dom";

const BlogGazette = () => {
    return (
        <div className="bg-[#f8f8f6] text-black">

            {/* HERO */}
            <section className="relative h-[90vh] overflow-hidden">

                {/* Mobile Image */}
                <img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783085742/Photoroom_20260703_153511_wl08qf.png"
                    alt="KAVANTI Gazette"
                    className="absolute inset-0 w-full h-full object-cover md:hidden"
                />

                {/* DESKTOP IMAGE */}
                <img
                    src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783113355/Photoroom_20260703_231531_axrl0e.png"
                    alt="KAVANTI Gazette"
                    className="absolute inset-0 hidden md:block w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/40"/>

                <div

                    className="
        relative z-10
        h-full
        flex flex-col
        items-center
        justify-center
        text-center
        px-6
        text-white
        mt-48
        md:mt-60

    ">


                <p className="uppercase tracking-[0.5em] text-xs md:text-sm mb-8">
                        KAVANTI GAZETTE
                    </p>

                    <h1 className="text-5xl md:text-6xl lg:text-5xl font-light leading-none">
                        Stories.
                        <br/>
                        Culture.
                        <br/>
                        Vision.
                    </h1>

                    <p className="max-w-2xl mt-8 text-lg md:text-base text-white/80">
                        Exploring African creativity, luxury streetwear
                        and the philosophy behind KAVANTI.
                    </p>

                </div>
            </section>

            {/* INTRO */}
            <section className="py-32 px-6">

                <div className="max-w-5xl mx-auto text-center">

                    <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                        Editorial Journal
                    </p>

                    <h2 className="text-4xl md:text-7xl font-light leading-tight">
                        More Than Fashion.
                        <br/>
                        A Collection Of Ideas.
                    </h2>

                </div>

            </section>

            {/* FEATURED STORY */}
            <section className="py-24 px-6">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">

                    <div className="lg:col-span-7">

                        <img
                            src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1778927540/Photoroom_20260516_123057_zwy2na.jpg"
                            alt="The Story Behind Kavanti"
                            className="w-full rounded-[2rem]"
                        />

                    </div>

                    <div className="lg:col-span-5">

                        <div className="text-[6rem] md:text-[10rem] leading-none text-black/5 font-light">
                            01
                        </div>

                        <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                            Featured Story
                        </p>

                        <h2 className="text-4xl md:text-6xl font-light leading-tight">
                            The Story Behind Kavanti
                        </h2>

                        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                            How a vision born from ambition became a growing
                            African streetwear identity built around confidence,
                            quality and self-expression.
                        </p>

                        <Link
                            to="/blog-gazette/from-kamoso-to-kavanti"
                            className="inline-block mt-10 border-b border-black pb-1"
                        >
                            Read Story
                        </Link>

                    </div>

                </div>

            </section>

            {/* QUOTE */}
            <section className="py-20 px-6">

                <div className="max-w-5xl mx-auto text-center">

                    <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                        KAVANTI Philosophy
                    </p>

                    <h2 className="text-4xl md:text-7xl font-light leading-tight">
                        Fashion is temporary.
                        <br/>
                        Identity is permanent.
                    </h2>

                </div>

            </section>

            {/* STORY 02 */}
            <section className="py-24 px-6">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">

                    {/* CONTENT */}
                    <div className="lg:col-span-5 order-2 lg:order-1">

                        <div className="text-[6rem] md:text-[10rem] leading-none text-black/5 font-light">
                            02
                        </div>

                        <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                            Fashion &amp; Style
                        </p>

                        <h2 className="text-4xl md:text-6xl font-light leading-tight">
                            How To Style
                            <br />
                            Oversized T-Shirts
                        </h2>

                        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                            Build effortless luxury streetwear looks with
                            oversized essentials.
                        </p>

                        <Link
                            to="/blog-gazette/how-to-style-oversized-t-shirts"
                            className="inline-block mt-10 border-b border-black pb-1"
                        >
                            Read Story
                        </Link>

                    </div>

                    {/* IMAGE */}
                    <div className="lg:col-span-7 order-1 lg:order-2">

                        <div className="overflow-hidden rounded-[2rem]">
                            <img
                                src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1778930234/Photoroom_20260516_131305_e9bx37.png"
                                alt="How to style oversized t-shirts"
                                className="w-full rounded-[2rem] transition-transform duration-700 hover:scale-105"
                            />
                        </div>

                    </div>

                </div>

            </section>

            {/* END BANNER */}
            <section className="relative h-[45vh] md:h-[60vh] overflow-hidden">

                <div className="flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783082929/Photoroom_20260703_144807_h1boqf.png"
                        alt="KAVANTI"
                        className="max-w-[250px] md:max-w-[400px] object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="absolute inset-x-0 flex justify-center">

                    <h2 className="text-lg tracking-[0.4em] uppercase text-center">
                        Today | Tomorrow & Always
                    </h2>

                </div>

            </section>

        </div>
    );
};

export default BlogGazette;