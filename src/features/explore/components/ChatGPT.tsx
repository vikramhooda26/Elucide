import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const reply: { [key: string]: any } = {
  Hi: "How can i assist you today ?",
  Tea: "Its too cold, let's have coffe."
};

export default function ChatGPT() {
  const [messages, setMessages] = useState<Message[]>([]);
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

  return (
    <div className="mx-auto flex h-[80vh] w-3/4 flex-col rounded-2xl border-2">
      <header className="flex items-center justify-between rounded-2xl border-b p-4">
        <h1 className="text-xl font-bold">Interacting with AI</h1>
        {/* <Button variant="outline">New Chat</Button> */}
      </header>

      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
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
  );
}
