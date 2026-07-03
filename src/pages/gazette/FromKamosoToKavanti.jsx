import React from "react";

const FromKamosoToKavanti = () => {
    return (
        <div className="bg-[#f8f8f6] text-black">

            {/* HERO */}
            <section className="min-h-[80vh] flex items-center">

                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    <p className="uppercase tracking-[0.5em] text-xs text-gray-500 mb-8">
                        KAVANTI JOURNAL
                    </p>

                    <h1 className="text-5xl md:text-8xl xl:text-[8rem] font-light leading-none">
                        From
                        <br />
                        Kamoso
                        <br />
                        To Kavanti
                    </h1>

                    <p className="mt-10 max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                        The evolution of an idea, a vision and the ambition
                        to create a globally recognised African luxury brand.
                    </p>

                </div>

            </section>

            {/* COVER IMAGE */}
            <section className="px-6 md:px-12">
                <div className="overflow-hidden rounded-[2rem] bg-white flex items-center justify-center h-[300px] md:h-[450px]">
                    <img
                        src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783087222/Photoroom_20251011_092539_caovft.png"
                        alt="KAVANTI"
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

            </section>

            {/* INTRO QUOTE */}
            <section className="py-40 px-6">

                <div className="max-w-5xl mx-auto text-center">

                    <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                        Our Philosophy
                    </p>

                    <h2 className="text-4xl md:text-7xl font-light leading-tight">
                        Fashion is temporary.
                        <br />
                        Identity is permanent.
                    </h2>

                </div>

            </section>

            {/* STORY */}
            <section className="pb-32 px-6">

                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">

                    {/* NUMBER */}
                    <div className="lg:col-span-2">
                        <div className="text-[6rem] md:text-[10rem] leading-none text-black/5 font-light">
                            01
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="lg:col-span-10">

                        <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-10">
                            The Beginning
                        </p>

                        <div className="space-y-12 text-xl text-gray-700 leading-relaxed">

                            <p>
                                Kavanti was never created simply to sell clothing.
                                It began with a deeper ambition: to build something
                                meaningful, something that reflected confidence,
                                progress and self-belief.
                            </p>

                            <p>
                                The name represents a journey. A transition from
                                where we started to where we aspire to be. It is a
                                symbol of growth, constant evolution and the belief
                                that identity should never be limited by circumstance.
                            </p>

                            <p>
                                Every garment, every collection and every decision
                                is guided by a commitment to quality. We are less
                                interested in trends and more interested in creating
                                pieces that remain relevant for years.
                            </p>

                            <p>
                                We design for those who move with intention. Those
                                who understand that style is not about attention,
                                but about expression.
                            </p>

                            <p>
                                As Kavanti grows, our mission remains unchanged:
                                to create products, experiences and stories that
                                inspire confidence and encourage people to embrace
                                their own journey.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* FULL WIDTH STATEMENT */}
            <section className="py-40 border-t border-b border-black/10">

                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-5xl md:text-8xl font-light leading-none">
                        Today.
                        <br />
                        Tomorrow.
                        <br />
                        Always.
                    </h2>

                </div>

            </section>

            {/* ENDING */}
            <section className="py-32">

                <div className="max-w-3xl mx-auto text-center px-6">

                    <p className="uppercase tracking-[0.4em] text-xs text-gray-500 mb-8">
                        The Future
                    </p>

                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-700">
                        What began as an idea continues to evolve into a
                        movement built on creativity, ambition and the belief
                        that African luxury belongs on the global stage.
                    </p>

                </div>

            </section>

        </div>
    );
};

export default FromKamosoToKavanti;