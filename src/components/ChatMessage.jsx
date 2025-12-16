const ChatMessage = ({ from, text }) => {
    const isUser = from === "user";

    return (
        <div
            className={`flex mb-3 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    isUser
                        ? "bg-black text-white rounded-br-none"
                        : "bg-gray-100 text-black rounded-bl-none"
                }`}
            >
                {text}
            </div>
        </div>
    );
};

export default ChatMessage;
