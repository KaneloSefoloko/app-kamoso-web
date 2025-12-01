import React from "react";

const PolicyModal = ({ open, onClose, title, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-lg"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <div className="text-gray-700 overflow-y-auto max-h-[60vh]">{children}</div>
            </div>
        </div>
    );
};

export default PolicyModal;
