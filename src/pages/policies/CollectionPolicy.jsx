import React from "react";

const CollectionPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16 px-6">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-14">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
                        Collection Policy
                    </h1>

                    <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        We offer a secure and convenient collection option for customers who prefer to pick up their orders in person.
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 sm:p-10 space-y-12">

                    {/* WHERE */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-black">
                            Where
                        </h2>

                        <div className="text-gray-600 text-sm leading-relaxed">
                            <p>Unit 000, Greenbay</p>
                            <p>Firlands Minor Rd, Admirals Park</p>
                            <p>Gordon’s Bay, 7135</p>
                        </div>
                    </section>

                    {/* WHEN */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-black">
                            When
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Orders must be collected within <span className="font-medium text-black">10 days</span> of receiving your “ready for pickup” notification.
                        </p>

                        {/* HOURS TABLE */}
                        <div className="overflow-hidden rounded-2xl border border-gray-100">
                            <table className="w-full text-sm">

                                <tbody className="divide-y divide-gray-100">

                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-700">Monday – Friday</td>
                                    <td className="px-4 py-3 text-gray-600">10h00 – 16h00</td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-700">Saturday</td>
                                    <td className="px-4 py-3 text-gray-600">09h00 – 14h00</td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-700">Sunday</td>
                                    <td className="px-4 py-3 text-gray-600">13h00 – 16h00</td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-700">Public Holidays</td>
                                    <td className="px-4 py-3 text-gray-600">10h00 – 13h00</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* COST */}
                    <section className="space-y-2">
                        <h2 className="text-lg font-semibold text-black">
                            Cost
                        </h2>

                        <p className="text-gray-600 text-sm">
                            Collection is completely free of charge.
                        </p>
                    </section>

                    {/* NOTES */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-black">
                            Important Notes
                        </h2>

                        <ul className="space-y-2 text-gray-600 text-sm list-disc pl-5">
                            <li>You’ll receive reminder notifications during the collection period</li>
                            <li>Orders not collected within 14 days will be held for up to 21 days</li>
                            <li>After 21 days, items may be returned to stock</li>
                        </ul>
                    </section>

                    {/* SHIPPING + RETURNS */}
                    <section className="grid sm:grid-cols-2 gap-6">

                        <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-semibold text-black mb-2">
                                Shipping
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Delivered in 2–5 business days. R90 / Free over R900
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-semibold text-black mb-2">
                                Returns
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Returns can be processed online or in-store depending on eligibility.
                            </p>
                        </div>

                    </section>

                </div>
            </div>
        </div>
    );
};

export default CollectionPolicy;