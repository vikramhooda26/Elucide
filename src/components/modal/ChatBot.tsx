import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';


interface Message {
    role: "user" | "assistant";
    content: string;
}

const initialMsg: Message = {
    role: "assistant",
    content: 'How can i assist you today ?',
}

const reply: { [key: string]: any } = {
    Hi: "How can i assist you today ?",
    Tea: "Its too cold, let's have coffe.",
    Yes: 'username: test, password: test'
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const [messages, setMessages] = useState<Message[]>([initialMsg]);
    const [input, setInput] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setTimeout(() => {
            const aiMessage: Message = {
                role: "assistant",
                content: reply[input] || "This is a simulated AI response."
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsOpen(true);
            setIsAnimating(false);
        }, 500);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen && (
                <motion.div
                    className="w-16 h-16 border border-primary bg-primary-foreground rounded-full shadow-lg cursor-pointer flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    onClick={handleClick}
                    animate={isAnimating ? { x: '-40vw', y: '-40vh', scale: 2 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-white text-lg">💬</span>
                </motion.div>
            )}

            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="bg-primary-foreground rounded-lg shadow-xl p-6 w-[80vh] h-[80vh] relative border-2 border-primary"
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 120 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-xl font-bold mb-4 flex justify-between">
                            Chat with Us
                            <button className="text-red-500" onClick={handleClose}>
                                ✖
                            </button>
                        </div>

                        <div className="mx-auto flex h-[65vh] flex-col rounded-2xl border-2">
                            {messages?.length ?
                                <ScrollArea className="flex-grow p-4 ">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                                        >
                                            <div
                                                className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`mx-2 rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                                                >
                                                    {message.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </ScrollArea>
                                :
                                <div className="flex-1 overflow-y-auto p-2">
                                    <p className="text-gray-600">How can I help you today?</p>
                                </div>}
                            <form onSubmit={handleSubmit} className="border-t p-4">
                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        placeholder="Type your message here..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="mr-2 flex-grow"
                                    />
                                    <Button type="submit">Send</Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ChatBot;
