import React from "react";

const ShippingDelivery = () => {
    return (
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white p-8">
                <h1 className="text-xl font-bold mb-6">Shipping & Delivery Information</h1>

                {/* HOW WILL I RECEIVE MY ORDER */}
                <h2 className="text-lg font-semibold mt-6 mb-2">How will I receive my order?</h2>

                {/* LOCAL ORDERS */}
                <h3 className="text-lg font-semibold mt-4 mb-2">Local Orders</h3>
                <p className="mb-3">
                    We use reputable South African couriers to get your orders delivered quickly to your door.
                </p>
                <p className="mb-3">
                    Every parcel that leaves our fulfilment centre has a tracking number which we can use to track the progress of your parcel effortlessly. When a parcel is booked out with our couriers, our system automatically updates your order with your tracking number and notifies you either by email or SMS.
                </p>
                <p className="mb-3">
                    Once your parcel is with our couriers, you will receive regular updates about your delivery so that you can prepare for its arrival. Your order tracking email will include a link you can use to query your delivery at any time.
                </p>
                <p className="mb-3">
                    You may also use the link below to track your delivery:
                </p>
                <p className="text-blue-600 underline break-all mb-4">
                    https://www.kavanti.co.za/a/track
                </p>

                {/* WHEN CAN I EXPECT DELIVERY */}
                <h2 className="text-xl font-semibold mt-6 mb-2">
                    I’ve just placed my order. When can I expect delivery?
                </h2>

                {/* LOCAL DELIVERY TIMES */}
                <h3 className="text-lg font-semibold mt-4 mb-2">Local Orders</h3>
                <p className="mb-3">
                    Shipping times vary depending on your delivery address.
                </p>
                <p className="mb-3">
                    We typically deliver within <strong>7 - 10 working days</strong> anywhere in South Africa. However, occasionally parcels may take slightly longer depending on regional servicing times.
                </p>
                <p className="mb-3">
                    If you haven't received your tracking details within 7 working days, please contact us at:
                </p>
                <p className="font-semibold">info@kavanti.co.za</p>
                <p className="font-semibold mb-4">+27 21 000 0000</p>
            </div>
        </div>
    );
};

export default ShippingDelivery;
