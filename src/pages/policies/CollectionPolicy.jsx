import React from 'react';

const CollectionPolicy = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-center mb-4">Collection Policy</h1>

            {/* Intro */}
            <p className="text-lg text-center font-light">
                We provide an alternative delivery option where you can collect your order at a safe meet-up spot for your
                convenience.
            </p>

            {/* Where */}
            <div className="text-base font-light">
                <h2 className="text-lg font-semibold mb-1">WHERE?</h2>
                <p >Unit 000, Greenbay</p>
                <p>Firlands Minor Rd, Admirals Park</p>
                <p>Gordon's Bay, 7135</p>
            </div>

            {/* When */}
            <div>
                <h2 className="text-lg font-semibold mb-1">WHEN?</h2>
                <p>Within 10 days of receiving a “ready for pick up” notification via email.</p>
            </div>
            <table className="w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                <tbody className="bg-white">
                <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Monday - Friday:</td>
                    <td className="px-4 py-2 text-gray-600 border-b border-gray-200">10h00 - 16h00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Saturday:</td>
                    <td className="px-4 py-2 text-gray-600 border-b border-gray-200">09h00 - 14h00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Sunday:</td>
                    <td className="px-4 py-2 text-gray-600 border-b border-gray-200">13h00 - 16h00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-700">Public Holidays:</td>
                    <td className="px-4 py-2 text-gray-600">10h00 - 13h00</td>
                </tr>
                </tbody>
            </table>


            {/* Cost */}
            <div>
                <h2 className="text-lg font-semibold mb-1">HOW MUCH DOES IT COST?</h2>
                <p className="text-base font-light">There is no charge for collecting at our store.</p>
            </div>

            {/* Notes */}
            <div>
                <h2 className="text-lg font-semibold mb-1">THINGS TO NOTE...</h2>
                <ul className="list-disc list-inside text-base font-light">
                    <li>You will receive a reminder during the 14-day collection period.</li>
                    <li>If not collected within 14 days, we will hold it for a maximum of 21 days.</li>
                    <li>After 21 days, items will be returned to stock and you will be notified.</li>
                </ul>
            </div>

            {/* Shipping & Returns */}
            <div>
                <h2 className="text-lg font-semibold mb-1">SHIPPING</h2>
                <p className="text-base font-light">Delivered in 2-5 business days. R90 / Free over R900</p>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-1">RETURNS</h2>
                <p className="text-base font-light">Return online orders in-store or online.</p>
            </div>
        </div>
    );
};

export default CollectionPolicy;
