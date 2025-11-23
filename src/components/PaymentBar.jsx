import React from 'react';

const PaymentBar = () => (
    <div className="bg-black text-white text-center py-2 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-1 md:space-y-0 md:space-x-4 text-sm">
            <span className="font-semibold">INSTALLMENTS</span>
            <span>PayJustNow | PayFlex | Happy Pay</span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-1 space-y-1 md:space-y-0 md:space-x-4 text-sm">
            <span className="font-semibold">EXPRESS PAYMENTS</span>
            <span>Capitec Pay | Apple Pay | Google Pay</span>
        </div>
    </div>
);

export default PaymentBar