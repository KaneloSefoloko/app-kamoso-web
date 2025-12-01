import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import CookieConsent from "../components/CookieConsent";
import PolicyModal from "../components/PolicyModal.jsx";

const PaymentPage = () => {
  const { checkoutInfo, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { cart = [], total = 0, userInfo = {} } = checkoutInfo || {};

  const [cardName, setCardName] = useState(userInfo.name || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showCookieModal, setShowCookieModal] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);

  if (!cart.length) {
    navigate("/checkout", { replace: true });
    return null;
  }

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  if (success) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful!</h2>
            <p className="mb-4">Your payment of <strong>R{total}</strong> has been processed.</p>
            <button
                onClick={() => navigate("/")}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Back to Home
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto md:flex md:gap-8">
          {/* Order Summary */}
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>R{item.price * item.quantity}</span>
                </div>
            ))}
            <div className="border-t border-gray-300 mt-4 pt-2 font-bold flex justify-between">
              <span>Total</span>
              <span>R{total}</span>
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
            <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
              <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 font-semibold rounded-lg ${
                      loading ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
              >
                {loading ? "Processing..." : `Pay R${total}`}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-4 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
            <a
                href="#"
                onClick={e => { e.preventDefault(); setPrivacyOpen(true); }}
                className="underline hover:text-gray-800 transition"
            >
              Privacy Policy
            </a>
            <a
                href="#"
                onClick={e => { e.preventDefault(); setTermsOpen(true); }}
                className="underline hover:text-gray-800 transition"
            >
              Terms of Service
            </a>
            <a
                href="#"
                onClick={e => { e.preventDefault(); setRefundOpen(true); }}
                className="underline hover:text-gray-800 transition"
            >
              Refund Policy
            </a>
            <a
                href="#"
                onClick={e => { e.preventDefault(); setShowCookieModal(true); }}
                className="underline hover:text-gray-800 transition"
            >
              Cookie Preferences
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500">&copy; {new Date().getFullYear()} Kavanti. All rights reserved.</p>
        </footer>

        {/* Modals */}
        <PolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy">
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
        </PolicyModal>

        <PolicyModal open={termsOpen} onClose={() => setTermsOpen(false)} title="Terms of Service">
          <p className="mb-3">
            This website is operated by Kamoso Group. Throughout the site, the
            terms “we”, “us” and “our” refer to Kamoso. Kamoso offers this website,
            including all information, tools and Services available from this site to
            you, the user, conditioned upon your acceptance of all terms, conditions,
            policies and notices stated here.
          </p>
          <p className="mb-3">
            By visiting our site and/or purchasing something from us, you engage in our
            “Service” and agree to be bound by these Terms of Service (“Terms”), including
            additional terms, conditions, and policies referenced herein. These Terms
            apply to all users of the site.
          </p>
          <p className="mb-3">
            Please read these Terms carefully before using our website. If you do not
            agree, you may not access the site or use the Services.
          </p>
          <p className="mb-3">
            Any new features added to the store will also be subject to these Terms. You
            can review the most current version of the Terms at any time on this page.
          </p>

          {/* SECTION 1 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 1 - ONLINE STORE TERMS</h2>
          <p className="mb-3">
            By agreeing to these Terms, you represent that you are at least the age of
            majority in your region or that a legal guardian has given consent.
          </p>
          <p className="mb-3">
            You may not use our products for illegal purposes or violate any laws in your
            jurisdiction.
          </p>
          <p className="mb-3">
            You must not transmit viruses or any destructive code. A breach of these
            Terms results in immediate termination of your Services.
          </p>

          {/* SECTION 2 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 2 - GENERAL CONDITIONS</h2>
          <p className="mb-3">
            We reserve the right to refuse Service to anyone at any time.
          </p>
          <p className="mb-3">
            Your content (excluding credit card details) may be transferred unencrypted
            across networks. Credit card information is always encrypted.
          </p>
          <p className="mb-3">
            You agree not to reproduce, sell, or exploit the Service without written
            permission.
          </p>

          {/* SECTION 3 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 3 - ACCURACY, COMPLETENESS & TIMELINESS</h2>
          <p className="mb-3">
            We are not responsible if information on this site is inaccurate or outdated.
            You use this site at your own risk.
          </p>

          {/* SECTION 4 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 4 - MODIFICATIONS TO THE SERVICE & PRICES</h2>
          <p className="mb-3">
            Prices may change without notice. We may modify or discontinue the Service at
            any time without liability.
          </p>

          {/* SECTION 5 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 5 - PRODUCTS OR SERVICES</h2>
          <p className="mb-3">
            Certain products or Services may be exclusive to online sales. These items
            may have limited quantities. Returns follow our Refund Policy.
          </p>
          <p className="mb-3">
            We cannot guarantee accurate color display on your monitor.
          </p>

          {/* SECTION 6 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 6 - ACCURACY OF BILLING & ACCOUNT INFORMATION</h2>
          <p className="mb-3">
            We reserve the right to refuse orders. You must provide accurate and current
            account information.
          </p>

          {/* SECTION 7 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 7 - OPTIONAL TOOLS</h2>
          <p className="mb-3">
            We may provide access to third-party tools without control or liability. You
            use them at your own risk.
          </p>

          {/* SECTION 8 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 8 - THIRD-PARTY LINKS</h2>
          <p className="mb-3">
            We are not responsible for third-party websites, content, or purchases made on
            external platforms.
          </p>

          {/* SECTION 9 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 9 - USER COMMENTS & FEEDBACK</h2>
          <p className="mb-3">
            By submitting comments, you grant us unrestricted rights to use them. You may
            not submit unlawful or harmful content.
          </p>

          {/* SECTION 10 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 10 - PERSONAL INFORMATION</h2>
          <p className="mb-3">
            Your submission of personal information is governed by our Privacy Policy.
          </p>

          {/* SECTION 11 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 11 - ERRORS & INACCURACIES</h2>
          <p className="mb-3">
            We may correct errors or update information at any time without notice.
          </p>

          {/* SECTION 12 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 12 - PROHIBITED USES</h2>
          <p className="mb-3">
            You are prohibited from unlawful, abusive, fraudulent, harmful, or malicious
            use of the site or Service.
          </p>

          {/* SECTION 13 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 13 - DISCLAIMER OF WARRANTIES</h2>
          <p className="mb-3">
            The Service is provided “as is” without warranties. We are not liable for any
            damages arising from use of the Service.
          </p>

          {/* SECTION 14 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 14 - INDEMNIFICATION</h2>
          <p className="mb-3">
            You agree to indemnify and hold Kamoso harmless from any claims arising from
            your breach of these Terms.
          </p>

          {/* SECTION 15 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 15 - SEVERABILITY</h2>
          <p className="mb-3">
            If any provision is deemed unlawful, the remaining provisions will continue
            to be enforceable.
          </p>

          {/* SECTION 16 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 16 - TERMINATION</h2>
          <p className="mb-3">
            These Terms remain effective until terminated by either party. We may
            terminate access at any time for violations.
          </p>

          {/* SECTION 17 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 17 - ENTIRE AGREEMENT</h2>
          <p className="mb-3">
            These Terms constitute the entire agreement between you and Kamoso regarding
            the Service.
          </p>

          {/* SECTION 18 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 18 - GOVERNING LAW</h2>
          <p className="mb-3">
            These Terms are governed by the laws of South Africa.
          </p>

          {/* SECTION 19 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 19 - CHANGES TO TERMS</h2>
          <p className="mb-3">
            We may update these Terms at any time. Continued use of the site means you
            accept the updated Terms.
          </p>

          {/* SECTION 20 */}
          <h2 className="underline text-lg font-semibold mt-6 mb-2">SECTION 20 - CONTACT INFORMATION</h2>
          <p className="mb-3">
            Questions about the Terms should be sent to:
          </p>
          <p className="font-semibold">info@Kamoso.co.za</p>
        </PolicyModal>

        <PolicyModal open={refundOpen} onClose={() => setRefundOpen(false)} title="Refund Policy">
          <p className="text-center text-gray-700 text-lg">
            At Kavanti, we want you to be completely satisfied with your purchase.
            If something isn’t perfect, we make returns and exchanges simple.
          </p>

          {/* Eligibility */}
          <div className="space-y-4">
            <h2 className="underline text-lg font-semibold text-gray-900">Eligibility</h2>
            <p className="text-gray-700">
              To be eligible for a return, please ensure:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Items are unworn, unwashed, and in their original condition.</li>
              <li>All tags and labels are intact.</li>
              <li>Return request is made within 14 days of delivery.</li>
            </ul>
          </div>

          {/* How to Return */}
          <div className="space-y-4">
            <h2 className="underline text-lg font-semibold text-gray-900">How to Return</h2>
            <p className="text-gray-700">
              To initiate a return, follow these steps:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Log in to your Kavanti account.</li>
              <li>Navigate to <strong>Orders</strong> and select the item you wish to return.</li>
              <li>Navigate to {" "}
                <a href="/orders"
                   className="text-blue-600 hover:underline"
                >
                  Orders
                </a>{" "}
                and select the item you wish to return.
              </li>
              <li>Click{" "}
                <a
                    href="/return"
                    className="text-blue-600 hover:underline"
                >
                  Log a Return
                </a>{" "}
                and follow the instructions.
              </li>
              <li>Pack your item securely and include the return slip.</li>
              <li>Drop the package off at the nearest courier or schedule a pickup.</li>
            </ol>
          </div>

          {/* Refunds */}
          <div className="space-y-4">
            <h2 className="underline text-lg font-semibold text-gray-900">Refunds</h2>
            <p className="text-gray-700">
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
            </p>
            <p className="text-gray-700">
              Approved refunds will be processed back to your original payment method within 5-7 business days.
            </p>
          </div>

          {/* Exchanges */}
          <div className="space-y-4">
            <h2 className="underline text-lg font-semibold text-gray-900">Exchanges</h2>
            <p className="text-gray-700">
              If you would like to exchange an item for a different size or color, please log a return and place a new order for the replacement item. We’ll refund your original purchase once the returned item is received.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-gray-700">
            <h2 className="underline text-lg font-semibold text-gray-900">Need Help?</h2>
            <p>
              If you have any questions about returns, feel free to contact us at{" "}
              <strong>info@kavanti.co.za</strong> or call us on{" "}
              <strong>+27 21 000 0000</strong>.
            </p>
          </div>
        </PolicyModal>

        <CookieConsent open={showCookieModal} onClose={() => setShowCookieModal(false)} />
      </div>
  );
};

export default PaymentPage;
