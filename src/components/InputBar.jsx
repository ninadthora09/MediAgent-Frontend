import React, { useState, useRef, useEffect } from "react";

const InputBar = ({ onSend, loading }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // 🔥 Auto-focus when user presses any key anywhere
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (document.activeElement === inputRef.current) return;
      if (e.key.length !== 1) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal);
  }, []);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const isActive = input.trim().length > 0 && !loading;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .send-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 0 20px rgba(59,130,246,0.5);
        }
        .send-btn:active:not(:disabled) { transform: translateY(0) scale(0.92); }
        .mediagent-input::placeholder { color: rgba(148,163,184,0.4); }
        .mediagent-input:focus { outline: none; }
        .input-wrap { transition: all 0.3s ease; }
        .input-wrap:focus-within {
          background: rgba(30,41,59,0.8) !important;
          border-color: rgba(59,130,246,0.4) !important;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.1) !important;
        }
      `}</style>

      <div className="z-10 flex-shrink-0 bg-transparent px-6 pb-6 pt-5">
        {/* Input row */}
        <div
          className="input-wrap flex items-center gap-3 rounded-[18px] border border-white/[0.08] bg-slate-900/40 px-[18px] py-2.5 backdrop-blur-[10px]"
        >
          {/* Leading icon */}
          <div className="flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            className="mediagent-input flex-1 bg-transparent font-sans text-[15px] leading-relaxed text-slate-100"
            type="text"
            placeholder="Ask anything (e.g. 'Book Dr. Sharma for 3pm')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          {/* Send button */}
          <button
            className="send-btn flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[14px] border-none"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                : "rgba(255,255,255,0.03)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.15)",
              cursor: isActive ? "pointer" : "not-allowed",
              boxShadow: isActive ? "0 4px 12px rgba(59,130,246,0.3)" : "none",
            }}
            onClick={handleSend}
            disabled={!isActive}
          >
            {loading ? (
              <span
                className="inline-block h-[18px] w-[18px] rounded-full border-2 border-white/30 border-t-white"
                style={{ animation: "spin 0.8s linear infinite" }}
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Hint */}
        <div className="mt-3 text-center font-sans text-[11px] tracking-wide text-slate-400">
          <span className="opacity-60">Pro Tip: </span>
          <kbd className="rounded border border-blue-500/20 bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
            Enter ↵
          </kbd>
          <span className="ml-2 opacity-60">to send message</span>
        </div>
      </div>
    </>
  );
};

export default InputBar;