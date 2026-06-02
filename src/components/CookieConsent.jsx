import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CookieConsent() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("kavanti_cookie_consent");

        if (!consent) {
            const timer = setTimeout(() => {
                setOpen(true);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const acceptAll = () => {
        localStorage.setItem("kavanti_cookie_consent", "accepted");
        setOpen(false);
    };

    const essentialOnly = () => {
        localStorage.setItem("kavanti_cookie_consent", "essential");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <>
            {/* BACKDROP */}
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99998]" />

            {/* MODAL */}
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999]">
                <div
                    className="
            w-full
            max-w-md
            md:max-w-xl
            overflow-hidden
            rounded-[32px]
            bg-[#f8f5f1]
            shadow-[0_35px_90px_rgba(0,0,0,0.25)]
            max-h-[90vh]
            overflow-y-auto
        "
                >

                    {/* HERO IMAGE */}
                    <div className="relative h-36 md:h-60 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
                            alt="KAVANTI"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <div className="text-white text-2xl md:text-4xl font-light tracking-[0.35em]">
                                KAVANTI
                            </div>

                            <div className="mt-3 text-white/90 text-xs uppercase tracking-[0.4em]">
                                Premium Apparel
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 md:p-10">

                        <div className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-3">
                            Welcome
                        </div>

                        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">
                            Your Experience Matters
                        </h2>

                        <p className="text-neutral-700 leading-relaxed mb-6">
                            Welcome to KAVANTI. We use cookies and similar
                            technologies to provide a seamless shopping
                            experience, remember your preferences, improve
                            website performance, and help us understand how
                            visitors interact with our store.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <span>✓</span>
                                <span className="text-sm text-neutral-700">
                                    Remember your preferences and settings
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <span>✓</span>
                                <span className="text-sm text-neutral-700">
                                    Deliver a smoother shopping experience
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <span>✓</span>
                                <span className="text-sm text-neutral-700">
                                    Improve website performance and reliability
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <span>✓</span>
                                <span className="text-sm text-neutral-700">
                                    Help us enhance products and services
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-neutral-500 leading-relaxed mb-8">
                            By selecting "Accept & Continue", you consent to
                            our use of cookies in accordance with our{" "}
                            <Link
                                to="/policies/privacy-policy"
                                className="underline underline-offset-2 hover:text-black"
                            >
                                Privacy Policy
                            </Link>.
                        </p>

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={acceptAll}
                                className="flex-1 bg-black text-white py-4 rounded-full uppercase tracking-[0.18em] text-sm transition-all hover:bg-neutral-900">
                                Accept & Continue
                            </button>

                            <button
                                onClick={essentialOnly}
                                className="
                                    flex-1
                                    border
                                    border-neutral-300
                                    bg-transparent
                                    py-4
                                    rounded-full
                                    uppercase
                                    tracking-[0.12em]
                                    text-sm
                                    transition-all
                                    hover:bg-white ">
                                Essential Only
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}