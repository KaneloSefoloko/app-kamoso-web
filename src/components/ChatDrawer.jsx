import { useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import ChatMessage from "./ChatMessage";

const ChatDrawer = ({ open, onClose, messages, setMessages }) => {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages((prev) => [
            ...prev,
            { from: "user", text: input },
            {
                from: "bot",
                text: "Thanks for reaching out! Our support team will reply shortly.",
            },
        ]);

        setInput("");
    };

    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* Drawer */}
            <div
                className={`
                    fixed bottom-0 right-0 z-[10000]
                    w-full sm:w-[380px]
                    h-[100dvh] sm:h-[75vh]
                    bg-white
                    rounded-none sm:rounded-t-2xl
                    shadow-2xl
                    flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${open ? "translate-y-0" : "translate-y-full"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
                    <h3 className="font-medium tracking-wide text-sm sm:text-base">
                        KAVANTI Support
                    </h3>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (!window.confirm("Start a new conversation?")) return;
                                setMessages([
                                    {
                                        from: "bot",
                                        text: "Hi 👋 Welcome to KAVANTI. How can we help you?",
                                    },
                                ]);
                            }}
                            className="text-xs sm:text-sm text-yellow-500 hover:text-black"
                        >
                            New chat
                        </button>

                        <button
                            onClick={onClose}
                            className="p-1"
                            aria-label="Close chat"
                        >
                            <FiX size={18} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                    {messages.map((msg, i) => (
                        <ChatMessage key={i} {...msg} />
                    ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t flex items-center gap-2 shrink-0 bg-white">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type your message..."
                        className="
                            flex-1
                            border
                            rounded-full
                            px-4 py-2
                            text-sm
                            focus:outline-none
                            focus:ring-1 focus:ring-black
                        "
                    />

                    <button
                        onClick={sendMessage}
                        className="
                            bg-black text-white
                            p-2
                            rounded-full
                            active:scale-95
                            transition
                        "
                        aria-label="Send message"
                    >
                        <FiSend size={16} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatDrawer;