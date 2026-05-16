import { motion } from "framer-motion";

const ChatMessage = ({ from, text }) => {
    const isUser = from === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
            }}
            className={`flex w-full mb-2 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div className="relative max-w-[78%] sm:max-w-[70%]">

                {/* MESSAGE BUBBLE */}
                <div
                    className={`
                        relative px-4 py-3 text-sm leading-relaxed
                        rounded-3xl break-words whitespace-pre-wrap
                        shadow-sm border
                        transition-opacity duration-200
                        ${
                        isUser
                            ? `
                                    bg-gradient-to-b from-black to-[#1a1a1a]
                                    text-white border-black/20
                                    rounded-br-md
                                `
                            : `
                                    bg-white
                                    text-black border-gray-200
                                    rounded-bl-md
                                `
                    }
                    `}
                >
                    {/* subtle inner highlight (Apple feel) */}
                    <div className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none bg-gradient-to-b from-white/20 to-transparent" />

                    <span className="relative z-10">
                        {text}
                    </span>
                </div>

                {/* “TAIL” DOT (soft iMessage hint, not sharp triangle) */}
                <div
                    className={`
                        absolute bottom-0 w-2.5 h-2.5 rotate-45
                        ${
                        isUser
                            ? "right-[-4px] bg-[#1a1a1a]"
                            : "left-[-4px] bg-white border border-gray-200"
                    }
                    `}
                />
            </div>
        </motion.div>
    );
};

export default ChatMessage;