import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import Layout from "./components/Layout";

const App = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your MediAgent. I can help you check doctor availability, book appointments, or manage existing ones.\n\nTry: 'Check slots for Dr. Sharma'",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      setLoading(true);
      const response = await fetch("https://mediagent-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, session_id: "user1" }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, type: data.type, data: data.data },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I'm having trouble connecting to the clinical server. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <style>{`
        @keyframes pulse {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .status-pulse { animation: pulse 2s infinite; }
      `}</style>

      {/* Chat wrapper */}
      <div className="flex h-[85vh] w-full max-w-[580px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-[24px]">

        {/* Header */}
        <div className="z-10 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-6 py-5">
          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            <div>
              <h3 className="m-0 text-base font-bold tracking-tight text-slate-50">
                Clinical Assistant
              </h3>
              <div className="mt-0.5 flex items-center gap-2">
                <div className="status-pulse h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-400">
                  MediAgent v2.0 · Online
                </span>
              </div>
            </div>
          </div>

          {/* Options button */}
          <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Scroll area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatWindow messages={messages} loading={loading} />
        </div>

        {/* Input */}
        <InputBar onSend={sendMessage} loading={loading} />
      </div>
    </Layout>
  );
};

export default App;