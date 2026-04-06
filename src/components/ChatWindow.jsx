import React, { useEffect, useRef } from "react";

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const renderMessage = (msg, index) => {
    if (msg.sender === "user") {
      return (
        <div key={index} className="flex justify-end">
          <div className="max-w-[85%] rounded-[20px_20px_4px_20px] border border-white/10 bg-gradient-to-br from-blue-500 to-blue-700 px-[18px] py-3 text-[14.5px] font-medium leading-relaxed text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.4)]">
            {msg.text}
          </div>
        </div>
      );
    }

    switch (msg.type) {
      case "success":
        return (
          <div key={index} className="flex items-start gap-3 self-start max-w-[90%]">
            <BotAvatar />
            <div className="min-w-[260px] rounded-[4px_24px_24px_24px] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 p-[18px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] backdrop-blur-[10px]">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-500 text-[12px] font-bold text-white">✓</div>
                <strong className="text-[15px] font-semibold text-emerald-100">{msg.text}</strong>
              </div>
              {msg.data && (
                <div className="flex flex-col gap-2 border-t border-emerald-500/20 pt-3">
                  <DetailRow label="DOCTOR" value={msg.data.doctor} labelClass="text-emerald-300/70" valueClass="text-emerald-50" />
                  <DetailRow label="TIME"   value={msg.data.time}   labelClass="text-emerald-300/70" valueClass="text-emerald-50" />
                </div>
              )}
            </div>
          </div>
        );

      case "suggestion":
        return (
          <div key={index} className="flex items-start gap-3 self-start max-w-[90%]">
            <BotAvatar />
            <div className="min-w-[260px] rounded-[4px_24px_24px_24px] border border-amber-500/30 bg-gradient-to-br from-amber-500/12 to-amber-500/3 p-[18px] backdrop-blur-[10px]">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-amber-500 text-[13px] font-bold text-white">!</div>
                <strong className="text-[15px] font-semibold text-amber-100">{msg.text}</strong>
              </div>
              <div className="flex flex-col gap-2.5 border-t border-amber-500/20 pt-3">
                {msg.data?.options?.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-lg border border-amber-500/10 bg-amber-500/5 px-3 py-2 text-[13.5px] text-amber-200">
                    <span className="h-1 w-1 rounded-full bg-amber-400 flex-shrink-0" />
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="flex items-start gap-3 self-start max-w-[90%]">
            <BotAvatar />
            <div className="rounded-[4px_20px_20px_20px] border border-white/10 bg-slate-800/70 px-[18px] py-3 text-[14.5px] leading-relaxed text-slate-200 backdrop-blur-[12px]">
              {msg.text}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
        .chat-msg { animation: msgIn 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2) both; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>

      <div className="chat-scroll flex flex-1 flex-col gap-4 overflow-y-auto bg-transparent p-6">
        {messages.map((msg, i) => (
          <div key={i} className="chat-msg flex flex-col">
            {renderMessage(msg, i)}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3 self-start">
            <BotAvatar />
            <div className="flex items-center gap-1.5 rounded-[4px_20px_20px_20px] border border-white/5 bg-slate-800/50 px-5 py-3.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400"
                  style={{ animation: "dotBounce 1.4s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-5" />
      </div>
    </>
  );
};

const BotAvatar = () => (
  <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] border border-blue-400/30 bg-gradient-to-br from-slate-900 to-slate-800 text-base text-blue-400 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
    ⚕
  </div>
);

const DetailRow = ({ label, value, labelClass, valueClass }) => (
  <div className="flex justify-between text-xs">
    <span className={`font-semibold tracking-wide ${labelClass}`}>{label}</span>
    <span className={`font-medium ${valueClass}`}>{value}</span>
  </div>
);

export default ChatWindow;