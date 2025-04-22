// src/components/AiChat.jsx
import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import axios from "axios";
import { Loader2, CornerUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Ai = () => {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage({ role: "user", content: input });
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });
      const aiReply = res.data.response;

      setTimeout(() => {
        addMessage({ role: "assistant", content: aiReply });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("AI Error:", err);
      addMessage({ role: "assistant", content: "Something went wrong." });
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-screen flex flex-col bg-[#F5F1EA] font-[Outfit] pt-[80px] pb-[40px] ">
      {/* Header */}
      <h2 className="text-center text-xl font-semibold py-4">
        What can I help with?
      </h2>

      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-36">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-3 text-sm max-w-[85%] shadow whitespace-pre-wrap break-words ${
              msg.role === "user"
                ? "bg-blue-100 self-end ml-auto"
                : "bg-gray-200 self-start"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="italic text-gray-500 text-sm">
            Philo AI is thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sticky Input */}
      <div className="fixed bottom-[100px] left-0 w-full px-4 z-20">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow border max-w-2xl mx-auto">
          <input
            type="text"
            className="flex-1 text-sm p-2 outline-none"
            placeholder="Ask anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin text-gray-500 w-5 h-5" />
            ) : (
              <CornerUpRight className="text-gray-700 w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sticky Footer at bottom */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow px-4 py-3 text-center text-sm text-gray-600 z-10">
        Powered by PhiloMind ✨
      </footer>
    </div>
  );
};

export default Ai;
