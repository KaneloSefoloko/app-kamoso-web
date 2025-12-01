import React from 'react';

const OurStory = () => (
    <div>
        {/* Hero Section */}
        <div
            className="relative h-[40vh] w-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/ABOUT_US_4.webp')" }}
        >
            <div className="absolute inset-0 bg-gray-100/40" />
        </div>

        {/* Origin & Philosophy */}
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 text-center font-sans md:font-serif font-light">
            <h1 className="text-3xl font-light text-black z-10">Our Story</h1>
            <p>
                Kavanti was born in the middle of the kasi noise founded in 2023 by Kanelo Sefoloko — where dreams feel
                too big, far apart from the reality and chances feel too small.
                The name stands for those who choose to rise anyway. Our designs are inspired by the streets we grew up
                on, the music that raised us, and the courage that
                it takes to stand out without asking for permission.
                <br /><br />
                Kavanti isn't just clothing. It's identity. It's for the ones who hustle with purpose. The ones who walk
                with quiet confidence. The ones
                who know they are becoming something greater day by day.
                <br /><br />
                Wear Kavanti. Don't just move through the world — leave a mark.
            </p>
            <p>
                Our vision is brought to life through an innovative, 21st-century African design philosophy
                that reflects the modern aspirations of South African youth.
            </p>
        </div>

        {/* Responsive Image Section with Overlay */}
        <div className="relative w-screen overflow-hidden">

            <div
                className="w-screen h-[200px] bg-no-repeat bg-center bg-contain"
                style={{ backgroundImage: "url('/assets/mtho.svg')" }}
            >

            {/* Optional: Overlay for better readability */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                {/* Optional: Centered text or content */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl">
                        TODAY | TOMORROW | ALWAYS
                    </h1>
                </div>
            </div>
        </div>

        {/* Vision & Core Values Section */}
        <div className="bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8 font-light">
                <div>
                    <h2 className="text-3xl font-light text-black text-center mb-4">Our Vision</h2>
                    <p className="font-sans md:font-serif text-center mb-4">
                        Kavanti aims on building a global streetwear identity that celebrates self-definition. We also
                        exist to empower individuals to stand as they are — confident,
                        expressive, and unapologetic. We aim to become a symbol of elevation: taking the everyday and
                        turning it into something bold, intentional, and distinct.
                    </p>
                    <ul className="list-disc list-inside text-center space-y-1">
                        <li>Style is personal.</li>
                        <li>Presence is power.</li>
                        <li>Culture is not followed — it is created.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-light text-black text-center mb-1">Quality</h3>
                    <p className="font-sans md:font-serif text-center mb-4">
                        Quality over quantity equates to longevity.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-light text-black text-center mb-1">Teamwork</h3>
                    <p className="font-sans md:font-serif text-center mb-4">
                        A collaborative effort is a lucrative effort.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-light text-black text-center mb-1">Customer service</h3>
                    <p className="font-sans md:font-serif text-center mb-4">
                        We serve beyond fashion.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default OurStory;
