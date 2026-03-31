import React, { useState, useRef, useEffect } from "react";

const InputBar = ({ onSend, loading }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // 🔥 Auto-focus when user presses any key anywhere
  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      // if already focused → do nothing
      if (document.activeElement === inputRef.current) return;

      // ignore special keys
      if (e.key.length !== 1) return;

      // ignore shortcuts (Ctrl, Cmd, Alt)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // focus input
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDownGlobal);

    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, []);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const isActive = input.trim().length > 0 && !loading;

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .send-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5) !important;
        }
        .send-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.92);
        }
        .mediagent-input::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }
        .mediagent-input:focus {
          outline: none;
        }
        .input-wrap {
          transition: all 0.3s ease;
        }
        .input-wrap:focus-within {
          background: rgba(30, 41, 59, 0.8) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>

      <div style={styles.container}>
        <div className="input-wrap" style={styles.inputWrap}>
          
          {/* Icon */}
          <div style={styles.leadingIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {/* 🔥 INPUT */}
          <input
            ref={inputRef}   // ✅ important
            className="mediagent-input"
            type="text"
            placeholder="Ask anything (e.g. 'Book Dr. Sharma for 3pm')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            disabled={loading}
          />

          {/* BUTTON */}
          <button
            className="send-btn"
            onClick={handleSend}
            style={{
              ...styles.button,
              background: isActive
                ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                : "rgba(255,255,255,0.03)",
              color: isActive ? "#fff" : "rgba(255,255,255,0.15)",
              cursor: isActive ? "pointer" : "not-allowed",
              boxShadow: isActive ? "0 4px 12px rgba(59,130,246,0.3)" : "none",
            }}
            disabled={!isActive}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Hint */}
        <div style={styles.hint}>
          <span style={{ opacity: 0.6 }}>Pro Tip: </span>
          <kbd style={styles.kbd}>Enter ↵</kbd> 
          <span style={{ marginLeft: 8, opacity: 0.6 }}>to send message</span>
        </div>
      </div>
    </>
  );
};

export default InputBar;


// 🎨 STYLES (unchanged)
const styles = {
  container: {
    padding: "20px 24px 24px",
    background: "transparent",
    flexShrink: 0,
    zIndex: 10,
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(15, 23, 42, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "18px",
    padding: "10px 10px 10px 18px",
    backdropFilter: "blur(10px)",
  },
  leadingIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "#f1f5f9",
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    lineHeight: "1.5",
    padding: "4px 0",
  },
  button: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.8s linear infinite",
  },
  hint: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "11px",
    color: "#94a3b8",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.02em",
  },
  kbd: {
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    borderRadius: "4px",
    padding: "2px 6px",
    fontSize: "10px",
    color: "#60a5fa",
    fontWeight: "bold",
  },
};