const BrandBanner = () => {
    return (
        <section className="relative h-[35vh] md:h-[50vh] bg-[#f6f6f3] flex items-center justify-center overflow-hidden">

            <img
                src="https://res.cloudinary.com/dkwfi3iku/image/upload/v1783082929/Photoroom_20260703_144807_h1boqf.png"
                alt="KAVANTI Campaign"
                className="absolute inset-0 w-full h-full object-contain"
            />

            <div className="absolute inset-x-0 bottom-4 md:bottom-6 flex justify-center">
                <h2 className="text-black text-lg tracking-[0.3em] font-light text-center">
                    Today | Tomorrow & Always
                </h2>
            </div>


        </section>
    );
};

export default BrandBanner;