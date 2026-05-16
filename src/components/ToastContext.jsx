import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState("");

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full text-sm z-[9999] shadow-xl">
                    {toast}
                </div>
            )}
        </ToastContext.Provider>
    );
};