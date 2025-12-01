const NotAvailable = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center
                        px-6 pt-40 sm:pt-48 md:pt-56 lg:pt-64 pb-20">

            <div className="text-gray-400 text-6xl mb-4">🚧</div>

            <h1 className="text-2xl font-bold mb-3">Page Coming Soon</h1>
            <p className="text-gray-600 max-w-md">
                This page is still under construction. Please come back later.
            </p>

        </div>
    );
};

export default NotAvailable;