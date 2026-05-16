const NotAvailable = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white via-gray-50 to-white">

            <div className="text-center max-w-md">

                {/* Icon */}
                <div className="mx-auto w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6">
                    <span className="text-4xl">🚧</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black mb-3">
                    Coming Soon
                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                    This section is currently being built with care and attention to detail.
                    We’re working on something better — check back soon.
                </p>

                {/* Subtle divider */}
                <div className="my-6 flex items-center justify-center">
                    <div className="h-px w-16 bg-gray-200" />
                </div>

                {/* Hint */}
                <p className="text-xs text-gray-400 tracking-wide uppercase">
                    Kavanti • Today | Tomorrow | Always
                </p>

            </div>
        </div>
    );
};

export default NotAvailable;