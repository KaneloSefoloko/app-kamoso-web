import { useEffect, useRef, useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import ChatMessage from "./ChatMessage";

const QUICK_REPLIES = [
    "Track my order",
    "Shipping info",
    "Returns policy",
    "Speak to support",
];

const ChatDrawer = ({ open, onClose }) => {
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hi 👋 Welcome to KAVANTI Support. How can we help you today?",
        },
    ]);

    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);

    const bottomRef = useRef(null);

    /* ---------------- AUTO SCROLL ---------------- */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    /* ---------------- LOAD CHAT ---------------- */
    useEffect(() => {
        const saved = localStorage.getItem("kavanti_chat");
        if (saved) setMessages(JSON.parse(saved));
    }, []);

    /* ---------------- SAVE CHAT ---------------- */
    useEffect(() => {
        localStorage.setItem("kavanti_chat", JSON.stringify(messages));
    }, [messages]);

    /* ---------------- SEND MESSAGE ---------------- */
    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg = input;

        setMessages((prev) => [
            ...prev,
            { from: "user", text: userMsg },
        ]);

        setInput("");
        setTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "Thanks for your message 🙌 Our team will respond shortly.",
                },
            ]);
            setTyping(false);
        }, 1200);
    };

    const resetChat = () => {
        if (!window.confirm("Start a new conversation?")) return;

        setMessages([
            {
                from: "bot",
                text: "Hi 👋 Welcome to KAVANTI Support. How can we help you?",
            },
        ]);
        localStorage.removeItem("kavanti_chat");
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
                    w-full sm:w-[400px]
                    h-[100dvh] sm:h-[75vh]
                    bg-white
                    rounded-none sm:rounded-t-2xl
                    shadow-[0_-10px_40px_rgba(0,0,0,0.2)]
                    flex flex-col
                    transition-transform duration-500 ease-out
                    ${open ? "translate-y-0" : "translate-y-full"}
                `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3 border-b bg-white/80 backdrop-blur-md">
                    <div>
                        <h3 className="font-medium text-sm tracking-wide">
                            KAVANTI Support
                        </h3>
                        <p className="text-xs text-gray-400">
                            We usually reply instantly
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={resetChat}
                            className="text-xs text-gray-500 hover:text-black"
                        >
                            New chat
                        </button>

                        <button onClick={onClose}>
                            <FiX size={18} />
                        </button>
                    </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa]">
                    {messages.map((msg, i) => (
                        <ChatMessage key={i} {...msg} />
                    ))}

                    {/* TYPING */}
                    {typing && (
                        <div className="text-xs text-gray-400 px-2">
                            KAVANTI is typing...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* QUICK REPLIES */}
                <div className="px-3 py-2 flex gap-2 flex-wrap bg-white border-t">
                    {QUICK_REPLIES.map((q) => (
                        <button
                            key={q}
                            onClick={() => setInput(q)}
                            className="text-xs px-3 py-1 rounded-full border hover:bg-black hover:text-white transition"
                        >
                            {q}
                        </button>
                    ))}
                </div>

                {/* INPUT */}
                <div className="p-3 border-t flex items-center gap-2 bg-white">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && sendMessage()
                        }
                        placeholder="Type your message..."
                        className="flex-1 border rounded-full px-4 py-2 text-sm
                        focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-black text-white p-2 rounded-full active:scale-95 transition"
                    >
                        <FiSend size={16} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatDrawer;