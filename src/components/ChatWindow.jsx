import React, { useEffect, useRef } from "react";

const ChatWindow = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const renderMessage = (msg, index) => {
    // USER MESSAGE
    if (msg.sender === "user") {
      return (
        <div key={index} style={{ ...styles.message, ...styles.user }}>
          <div style={styles.userBubble}>{msg.text}</div>
        </div>
      );
    }

    // BOT MESSAGE TYPES
    switch (msg.type) {
      case "success":
        return (
          <div key={index} style={styles.botRow}>
            <div style={styles.botAvatar}>⚕</div>
            <div style={styles.successCard}>
              <div style={styles.successHeader}>
                <div style={styles.successIcon}>✓</div>
                <strong style={styles.successTitle}>{msg.text}</strong>
              </div>
              {msg.data && (
                <div style={styles.cardDetails}>
                  <div style={styles.cardDetailRow}>
                    <span style={styles.cardLabel}>DOCTOR</span>
                    <span style={styles.cardValue}>{msg.data.doctor}</span>
                  </div>
                  <div style={styles.cardDetailRow}>
                    <span style={styles.cardLabel}>TIME</span>
                    <span style={styles.cardValue}>{msg.data.time}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "suggestion":
        return (
          <div key={index} style={styles.botRow}>
            <div style={styles.botAvatar}>⚕</div>
            <div style={styles.suggestion}>
              <div style={styles.suggestionHeader}>
                <div style={styles.warnIcon}>!</div>
                <strong style={styles.suggestionTitle}>{msg.text}</strong>
              </div>
              <div style={styles.suggestionList}>
                {msg.data?.options?.map((opt, i) => (
                  <div key={i} style={styles.suggestionItem}>
                    <span style={styles.bulletDot} />
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} style={styles.botRow}>
            <div style={styles.botAvatar}>⚕</div>
            <div style={{ ...styles.message, ...styles.bot }}>
              <div style={styles.botBubble}>{msg.text}</div>
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
          40%           { transform: translateY(-6px); opacity: 1; }
        }
        .chat-msg { animation: msgIn 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2) both; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .chat-scroll { scroll-behavior: smooth; }
      `}</style>
      
      <div className="chat-scroll" style={styles.container}>
        {messages.map((msg, i) => (
          <div key={i} className="chat-msg">
            {renderMessage(msg, i)}
          </div>
        ))}

        {loading && (
          <div style={styles.botRow}>
            <div style={styles.botAvatar}>⚕</div>
            <div style={styles.thinkingBubble}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  ...styles.dot,
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} style={{ height: 20 }} />
      </div>
    </>
  );
};

export default ChatWindow;

const styles = {
  container: {
    flex: 1,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
    background: "transparent",
    maxHeight: "100%",
  },

  // ── USER ──────────────────────────────────────────────
  message: {
    display: "flex",
    maxWidth: "85%",
  },
  user: {
    alignSelf: "flex-end",
  },
  userBubble: {
    background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "20px 20px 4px 20px",
    fontSize: "14.5px",
    lineHeight: "1.5",
    fontWeight: "500",
    boxShadow: "0 8px 20px -6px rgba(59, 130, 246, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },

  // ── BOT ROW ───────────────────────────────────────────
  botRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    alignSelf: "flex-start",
    maxWidth: "90%",
  },
  botAvatar: {
    width: 34, height: 34,
    borderRadius: "10px", // Squircle look
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    border: "1px solid rgba(96, 165, 250, 0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", color: "#60a5fa",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  botBubble: {
    background: "rgba(30, 41, 59, 0.7)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e2e8f0",
    padding: "12px 18px",
    borderRadius: "4px 20px 20px 20px",
    fontSize: "14.5px",
    lineHeight: "1.6",
    backdropFilter: "blur(12px)",
  },

  // ── THINKING ──────────────────────────────────────────
  thinkingBubble: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(30, 41, 59, 0.5)",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "14px 20px",
    borderRadius: "4px 20px 20px 20px",
  },
  dot: {
    width: 6, height: 6,
    borderRadius: "50%",
    background: "#60a5fa",
    display: "inline-block",
    animation: "dotBounce 1.4s ease-in-out infinite",
  },

  // ── SUCCESS CARD ──────────────────────────────────────
  successCard: {
    background: "linear-gradient(160deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    padding: "18px",
    borderRadius: "4px 24px 24px 24px",
    minWidth: "260px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
  },
  successHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: "14px",
  },
  successIcon: {
    width: 22, height: 22,
    borderRadius: "50%",
    background: "#10b981",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", color: "#fff",
    fontWeight: "bold",
  },
  successTitle: {
    color: "#d1fae5",
    fontSize: "15px",
    fontWeight: "600",
  },
  cardDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(16, 185, 129, 0.2)",
  },
  cardDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
  },
  cardLabel: { color: "#6ee7b7", opacity: 0.7, fontWeight: "600", letterSpacing: "0.5px" },
  cardValue: { color: "#ecfdf5", fontWeight: "500" },

  // ── SUGGESTION CARD ───────────────────────────────────
  suggestion: {
    background: "linear-gradient(160deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 100%)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    padding: "18px",
    borderRadius: "4px 24px 24px 24px",
    minWidth: "260px",
    backdropFilter: "blur(10px)",
  },
  suggestionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: "14px",
  },
  warnIcon: {
    width: 22, height: 22,
    borderRadius: "50%",
    background: "#f59e0b",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "13px", color: "#fff",
    fontWeight: "bold",
  },
  suggestionTitle: {
    color: "#fef3c7",
    fontSize: "15px",
    fontWeight: "600",
  },
  suggestionList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(245, 158, 11, 0.2)",
  },
  suggestionItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fde68a",
    fontSize: "13.5px",
    background: "rgba(245, 158, 11, 0.05)",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(245, 158, 11, 0.1)",
  },
  bulletDot: {
    width: 4, height: 4,
    borderRadius: "50%",
    background: "#f59e0b",
  },
};