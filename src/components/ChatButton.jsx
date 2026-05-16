import { FiMessageCircle } from "react-icons/fi";

const ChatButton = ({ onClick, hasNotification = true }) => {
    return (
        <button
            onClick={onClick}
            aria-label="Open chat"
            className="
                fixed bottom-14 sm:bottom-6 right-6 z-[9999]
                w-14 h-14 rounded-full
                bg-white/80 backdrop-blur-xl
                border border-black/10
                shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                hover:shadow-[0_15px_45px_rgba(0,0,0,0.18)]
                hover:scale-110 active:scale-95
                transition-all duration-300
                flex items-center justify-center
                group
            "
        >
            {/* ICON */}
            <FiMessageCircle
                size={22}
                className="text-black group-hover:scale-110 transition-transform duration-300"
            />

            {/* NOTIFICATION DOT */}
            {hasNotification && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
            )}

            {/* GLOW RING */}
            <span className="absolute inset-0 rounded-full border border-black/10 opacity-0 group-hover:opacity-100 scale-110 transition" />
        </button>
    );
};

export default ChatButton;