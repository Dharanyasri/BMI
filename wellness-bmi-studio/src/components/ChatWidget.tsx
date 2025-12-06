import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

const ChatWidget = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
  {
    sender: "bot",
    text: "Hey! 👋 I'm FitBuddy, your friendly health assistant. Ask me anything about BMI, diet, exercise or healthy habits – I’m here to support you 💚",
  },
]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "AI Error",
          description: data.message || "Failed to get AI response.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const botMsg: ChatMessage = {
        sender: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Cannot reach AI backend. Check if Node server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-2 rounded-2xl">
            <CardHeader className="py-3">
              <CardTitle className="flex items-center justify-between text-base">
  <span>FitBuddy – Your Health Buddy 💪</span>
</CardTitle>

            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {/* Messages */}
              <div className="h-64 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2 pt-1">
                <Input
                  placeholder="Ask about BMI, diet, fitness..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="text-sm"
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="rounded-full"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {loading && (
                <p className="text-xs text-muted-foreground text-center pb-1">
                  Thinking of the best advice for you…
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
