import React, { useState, useEffect } from "react";

const COOKIE_PREF_KEY = "cookiePreferences";

const CookieConsent = ({ open, onClose }) => {
    const [prefs, setPrefs] = useState({
        required: true,
        personalization: false,
        marketing: false,
        analytics: false,
    });

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_PREF_KEY);
        if (stored) {
            try {
                setPrefs(prev => ({ ...prev, ...JSON.parse(stored) }));
            } catch (e) {
                console.warn("Invalid cookie prefs in localStorage", e);
            }
        }
    }, []);

    const toggle = (key) => {
        if (key === "required") return;
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        localStorage.setItem(COOKIE_PREF_KEY, JSON.stringify(prefs));
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6 relative scale-in">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
                >
                    &times;
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold mb-3">Cookie Preferences</h2>
                <p className="text-gray-600 mb-4">
                    You control your data. Choose which cookies you want to allow.
                </p>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                        <span>Required</span>
                        <input type="checkbox" checked={true} disabled />
                    </label>

                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                        <span>Personalization</span>
                        <input
                            type="checkbox"
                            checked={prefs.personalization}
                            onChange={() => toggle("personalization")}
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                        <span>Marketing</span>
                        <input
                            type="checkbox"
                            checked={prefs.marketing}
                            onChange={() => toggle("marketing")}
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                        <span>Analytics</span>
                        <input
                            type="checkbox"
                            checked={prefs.analytics}
                            onChange={() => toggle("analytics")}
                        />
                    </label>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;