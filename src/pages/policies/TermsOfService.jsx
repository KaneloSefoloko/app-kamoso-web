import React from "react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14 space-y-3">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                        Terms of Service
                    </h1>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                        Please read these terms carefully before using our website or services.
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10 space-y-12">

                    {/* Intro */}
                    <Section title="Overview">
                        <p>
                            This website is operated by Kamoso Group. Throughout the site, the terms
                            “we”, “us” and “our” refer to Kamoso.
                        </p>
                        <p>
                            By using our site or purchasing from us, you agree to be bound by these Terms.
                            If you do not agree, you may not access or use our services.
                        </p>
                        <p>
                            These Terms apply to all users and may be updated at any time.
                        </p>
                    </Section>

                    {/* Sections */}
                    <Section title="Online Store Terms">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>You must be of legal age or have guardian consent.</li>
                            <li>Products may not be used for unlawful purposes.</li>
                            <li>No malicious code or harmful activity is allowed.</li>
                        </ul>
                    </Section>

                    <Section title="General Conditions">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>We reserve the right to refuse service at any time.</li>
                            <li>Data may be transferred securely across networks.</li>
                            <li>Unauthorized reproduction is prohibited.</li>
                        </ul>
                    </Section>

                    <Section title="Pricing & Service Changes">
                        <p>
                            Prices and services may change or be discontinued without notice.
                        </p>
                    </Section>

                    <Section title="Products & Availability">
                        <p>
                            Products may be limited in quantity and subject to availability.
                            Colours may vary depending on device display.
                        </p>
                    </Section>

                    <Section title="Billing & Account Accuracy">
                        <p>
                            You agree to provide accurate and complete information for all purchases.
                        </p>
                    </Section>

                    <Section title="Third-Party Tools & Links">
                        <p>
                            We are not responsible for third-party tools or external websites.
                            Use them at your own discretion.
                        </p>
                    </Section>

                    <Section title="User Content">
                        <p>
                            By submitting content, you grant us permission to use it for business purposes.
                        </p>
                    </Section>

                    <Section title="Prohibited Uses">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Fraudulent or abusive activity</li>
                            <li>Illegal usage of the website</li>
                            <li>Harmful or malicious behavior</li>
                        </ul>
                    </Section>

                    <Section title="Disclaimer">
                        <p>
                            The service is provided “as is” without warranties of any kind.
                        </p>
                    </Section>

                    <Section title="Termination">
                        <p>
                            We may terminate access if Terms are violated.
                        </p>
                    </Section>

                    <Section title="Governing Law">
                        <p>
                            These Terms are governed by the laws of South Africa.
                        </p>
                    </Section>

                    <Section title="Contact">
                        <p>
                            For questions, contact{" "}
                            <span className="font-medium text-gray-900">info@Kamoso.co.za</span>
                        </p>
                    </Section>

                </div>
            </div>
        </div>
    );
};

/* Reusable Section */
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

export default TermsOfService;