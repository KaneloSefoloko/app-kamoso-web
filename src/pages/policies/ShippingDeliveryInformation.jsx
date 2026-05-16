import React from "react";

const ShippingDelivery = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16 px-6">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-14">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
                        Shipping & Delivery
                    </h1>

                    <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Everything you need to know about how your order is processed, shipped, and delivered.
                    </p>
                </div>

                {/* CONTENT CARD */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 sm:p-10 space-y-12">

                    {/* SECTION 1 */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            How will I receive my order?
                        </h2>

                        <h3 className="text-sm font-medium text-black">
                            Local Orders
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            We use trusted South African couriers to deliver your order directly to your door.
                        </p>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Every parcel is assigned a tracking number which is automatically sent to you via email or SMS once dispatched.
                        </p>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            You’ll receive live updates as your order moves through the delivery process.
                        </p>
                    </section>

                    {/* TRACKING */}
                    <section className="space-y-3">
                        <h3 className="text-sm font-medium text-black">
                            Track your order
                        </h3>

                        <a
                            href="https://www.kavanti.co.za/a/track"
                            className="text-sm text-black font-medium underline underline-offset-4 hover:opacity-70 transition"
                        >
                            https://www.kavanti.co.za/a/track
                        </a>
                    </section>

                    {/* DELIVERY TIME */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            When will I receive my order?
                        </h2>

                        <h3 className="text-sm font-medium text-black">
                            Local Delivery Times
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Delivery times depend on your location, but most orders within South Africa arrive within
                            <span className="font-semibold text-black"> 7–10 working days</span>.
                        </p>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            In some regions, delivery may take slightly longer depending on courier availability.
                        </p>
                    </section>

                    {/* CONTACT */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            Need help?
                        </h2>

                        <p className="text-gray-600 text-sm">
                            If your tracking hasn’t updated after 7 working days, contact us:
                        </p>

                        <div className="space-y-1 text-sm">
                            <p className="text-black font-medium">info@kavanti.co.za</p>
                            <p className="text-black font-medium">+27 62 783 3498</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default ShippingDelivery;