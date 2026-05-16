import React from "react";

const PaymentBar = () => (
    <div className="relative overflow-hidden bg-black text-white">

        {/* subtle glow line */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-3">

            {/* INSTALLMENTS */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm tracking-wide">

                <span className="uppercase font-semibold text-white/90">
                    Installments
                </span>

                <span className="text-white/70 text-center">
                    PayJustNow • PayFlex • Happy Pay
                </span>
            </div>

            {/* divider */}
            <div className="my-2 h-[1px] bg-white/10 w-full max-w-md mx-auto" />

            {/* EXPRESS PAYMENTS */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm tracking-wide">

                <span className="uppercase font-semibold text-white/90">
                    Express Payments
                </span>

                <span className="text-white/70 text-center">
                    Capitec Pay • Apple Pay • Google Pay
                </span>
            </div>
        </div>
    </div>
);

export default PaymentBar;