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
      const response = await fetch(`${import.meta.env.BACKEND_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          session_id: "user1",
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply, type: data.type, data: data.data }]);
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
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        .status-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      <div style={styles.chatWrapper}>
        {/* 🏥 Premium Header */}
        <div style={styles.header}>
          <div style={styles.headerInfo}>
            <div style={styles.avatarPlaceholder}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h3 style={styles.headerTitle}>Clinical Assistant</h3>
              <div style={styles.statusRow}>
                <div className="status-pulse" style={styles.dot}></div>
                <span style={styles.statusText}>MediAgent v2.0 • Online</span>
              </div>
            </div>
          </div>
          
          <button style={styles.optionsBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>

        {/* Chat Content */}
        <div style={styles.scrollArea}>
          <ChatWindow messages={messages} loading={loading} />
        </div>

        {/* Action Area */}
        <InputBar onSend={sendMessage} loading={loading} />
      </div>
    </Layout>
  );
};

export default App;

// 🎨 ULTRA-MODERN WRAPPER STYLES
const styles = {
  chatWrapper: {
    width: "100%",
    maxWidth: "580px",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    background: "rgba(15, 23, 42, 0.8)", // Deep Slate
    backdropFilter: "blur(24px)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 40px 100px -20px rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
    position: "relative",
  },

  header: {
    padding: "20px 24px",
    background: "rgba(255, 255, 255, 0.03)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatarPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(96, 165, 250, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },

  headerTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#f8fafc",
    letterSpacing: "-0.3px",
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "2px",
  },

  statusText: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "500",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  optionsBtn: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.2s",
  },

  scrollArea: {
    flex: 1,
    overflow: "hidden", // Let ChatWindow handle internal scroll
    display: "flex",
    flexDirection: "column",
  },
};