import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white p-8">
                <h1 className="text-xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-2">
                    This Privacy Policy describes how your personal information is
                    collected, used, and shared when you visit or make a purchase from
                    <strong> www.kavanti.co.za</strong> (the “Site”).
                </p>

                {/* Section: Personal Information We Collect */}
                <h2 className="text-lg font-semibold mt-4 mb-2">
                    Personal Information We Collect
                </h2>
                <p className="mb-2">
                    When you visit the Site, we automatically collect certain information
                    about your device, including information about your web browser, IP
                    address, time zone, and some of the cookies that are installed on your
                    device. Additionally, as you browse the Site, we collect information
                    about the individual web pages or products that you view, what
                    websites or search terms referred you to the Site and information
                    about how you interact with the Site. We refer to this
                    automatically-collected information as <strong>“Device Information”</strong>.
                </p>

                <p className="mb-2">We collect Device Information using the following technologies:</p>
                <ul className="list-disc ml-6 mb-2">
                    <li>
                        <strong>Cookies</strong> – data files placed on your device that may include an anonymous unique identifier. Learn more at allaboutcookies.org.
                    </li>
                    <li>
                        <strong>Log files</strong> – track actions on the Site and collect your IP address, browser type, ISP, referring/exit pages, and timestamps.
                    </li>
                    <li>
                        <strong>Web beacons, tags, and pixels</strong> – electronic files used to record how you browse the Site.
                    </li>
                </ul>

                <p className="mb-2">
                    Additionally, when you make or attempt to make a purchase through the
                    Site, we collect certain information including your name, billing
                    address, shipping address, email address, and phone number. We call
                    this <strong>“Order Information.”</strong> Note that we do not collect or store your
                    credit card details.
                </p>

                <p className="mb-2">
                    When we refer to <strong>“Personal Information”</strong> in this Privacy Policy, we
                    mean both Device Information and Order Information.
                </p>

                {/* Section: How We Use Your Personal Information */}
                <h2 className="text-lg font-semibold mt-6 mb-2">
                    How Do We Use Your Personal Information?
                </h2>
                <p className="mb-2">
                    We use Order Information to fulfil orders placed through the Site,
                    including processing payments, arranging shipping, and providing
                    invoices or confirmations. Additionally, we use Order Information to:
                </p>
                <ul className="list-disc ml-6 mb-2">
                    <li>Communicate with you;</li>
                    <li>Screen orders for potential risk or fraud;</li>
                    <li>
                        Provide information or advertising relating to our products or
                        services based on your preferences.
                    </li>
                </ul>

                <p className="mb-2">
                    Device Information is used to screen for potential risk and fraud
                    (especially your IP address), and more generally to improve and
                    optimise our Site by generating analytics and measuring marketing
                    performance.
                </p>

                {/* Section: Sharing Your Personal Information */}
                <h2 className="text-lg font-semibold mt-6 mb-2">
                    Sharing Your Personal Information
                </h2>
                <p className="mb-2">
                    We share your Personal Information with third parties to help us use
                    it as described above. We use Google Analytics to understand how
                    customers use the Site. Learn how Google uses your information by
                    searching “Google Privacy Policy.” You may opt out via Google’s
                    opt-out tools.
                </p>

                <p className="mb-2">
                    We may also share your information to comply with applicable laws,
                    respond to subpoenas or lawful requests, or protect our rights.
                </p>

                {/* Section: Behavioural Advertising */}
                <h2 className="text-lg font-semibold mt-6 mb-2">
                    Behavioural Advertising
                </h2>
                <p className="mb-2">
                    We use your Personal Information to provide targeted advertisements or
                    marketing communications we believe may interest you.
                </p>
                <p className="mb-2">You can opt out of targeted advertising using:</p>
                <ul className="list-disc ml-6 mb-2">
                    <li>Facebook Ads settings</li>
                    <li>Google Ads settings</li>
                    <li>Bing personalized ads settings</li>
                </ul>
                <p className="mb-2">
                    You may also opt out using the Digital Advertising Alliance opt-out
                    portal.
                </p>

                {/* Section: Do Not Track */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Do Not Track</h2>
                <p className="mb-2">
                    We do not alter our Site’s data collection or usage practices when we
                    receive a Do Not Track signal.
                </p>

                {/* Section: Your Rights */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Your Rights</h2>
                <p className="mb-2">
                    If you are a European resident, you may request access to, correction
                    of, or deletion of your personal information. Contact us using the
                    information below to exercise your rights.
                </p>
                <p className="mb-2">
                    Your information may be transferred outside Europe, including to
                    Canada and the United States.
                </p>

                {/* Section: Data Retention */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Data Retention</h2>
                <p className="mb-2">
                    When you place an order, we retain your Order Information for our
                    records unless you request deletion.
                </p>

                {/* Section: Changes */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Changes</h2>
                <p className="mb-2">
                    We may update this policy to reflect changes in practices, legal
                    requirements, or other operational reasons.
                </p>

                {/* Section: Minors */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Minors</h2>
                <p className="mb-2">
                    The Site is intended for individuals of all ages.
                </p>

                {/* Section: Contact Us */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Contact Us</h2>
                <p className="mb-2">
                    For questions or complaints about our privacy practices, contact us at:
                </p>
                <p className="font-semibold">info@kavanti.co.za</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;