import { FiClock } from "react-icons/fi";

const Footwear = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-white px-6">
            <div className="max-w-md text-center">
                <FiClock size={32} className="mx-auto mb-6 text-gray-300" />

                <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-3">
                    Footwear
                </h1>

                <p className="text-gray-500 leading-relaxed mb-6">
                    Designed to move different.
                    <br />
                    Our first footwear collection is currently in development.
                </p>

                <p className="text-sm text-gray-300">
                    Stay tuned — something special is coming.
                </p>
            </div>
        </div>
    );
};

export default Footwear;
