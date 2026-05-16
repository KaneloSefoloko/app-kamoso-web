import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14 space-y-3">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto">
                        How we collect, use, and protect your information when you use www.kavanti.co.za
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-10">

                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        This Privacy Policy describes how your personal information is
                        collected, used, and shared when you visit or make a purchase from{" "}
                        <strong>www.kavanti.co.za</strong>.
                    </p>

                    {/* SECTION */}
                    <Section title="Personal Information We Collect">
                        <p>
                            When you visit the Site, we automatically collect certain device information
                            such as browser type, IP address, time zone, and cookies. We also track
                            browsing behavior and interactions.
                        </p>

                        <p>
                            When you purchase, we collect order information such as name, billing,
                            shipping, email, and phone number.
                        </p>

                        <p>
                            We refer to this combined data as <strong>Personal Information</strong>.
                        </p>

                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li><strong>Cookies</strong> — stored data files</li>
                            <li><strong>Log files</strong> — browsing activity tracking</li>
                            <li><strong>Pixels</strong> — usage analytics tools</li>
                        </ul>
                    </Section>

                    <Section title="How We Use Your Information">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Process and fulfil orders</li>
                            <li>Prevent fraud and risk</li>
                            <li>Communicate with customers</li>
                            <li>Improve website performance</li>
                            <li>Personalise marketing</li>
                        </ul>
                    </Section>

                    <Section title="Sharing Your Information">
                        <p>
                            We share data with trusted third parties such as analytics providers
                            to improve services and user experience. We may also share data when legally required.
                        </p>
                    </Section>

                    <Section title="Behavioural Advertising">
                        <p>We may use your data for personalised advertising.</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Facebook Ads</li>
                            <li>Google Ads</li>
                            <li>Bing Ads</li>
                        </ul>
                    </Section>

                    <Section title="Your Rights">
                        <p>
                            You may request access, correction, or deletion of your data depending on your region.
                        </p>
                    </Section>

                    <Section title="Data Retention">
                        <p>
                            We retain order information unless deletion is requested.
                        </p>
                    </Section>

                    <Section title="Contact Us">
                        <p>
                            For privacy questions contact us at{" "}
                            <span className="font-medium text-gray-900">info@kavanti.co.za</span>
                        </p>
                    </Section>

                </div>
            </div>
        </div>
    );
};

/* Reusable section styling */
const Section = ({ title, children }) => (
    <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight border-l-4 border-black pl-3">
            {title}
        </h2>
        <div className="space-y-3 text-gray-700 leading-relaxed text-sm md:text-base">
            {children}
        </div>
    </div>
);

export default PrivacyPolicy;