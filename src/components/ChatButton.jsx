import { FiMessageCircle } from "react-icons/fi";

const ChatButton = ({ onClick }) => {
    return (
        <button
            onClick={ onClick }
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md
                        shadow-lg shadow-black/10 hover:scale-105 hover:shadow-xl transition-all duration-300
                        flex items-center justify-center"
            aria-label="Open chat"
        >
            <FiMessageCircle size={22} />
        </button>
    );
};

export default ChatButton;
