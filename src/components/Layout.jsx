import React from "react";

const Layout = ({ children }) => {
  return (
    <div style={styles.container}>
      {/* BACKGROUND DECORATION */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      {/* LEFT PANEL: INFO & BRANDING */}
      <div style={styles.left}>
        <div style={styles.content}>
          <div style={styles.brandBadge}>Powered by AI</div>
          <h1 style={styles.title}>
            MediAgent<span style={{ color: "#adb4bd" }}>.</span>
          </h1>
          <p style={styles.tagline}>
            Experience the future of healthcare scheduling with our 
            intelligent, conversational AI assistant.
          </p>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>🚀</span>
              <h3 style={styles.cardTitle}>What it does</h3>
            </div>
            <p style={styles.cardText}>
              Book, check, and cancel appointments using natural language.
              Seamlessly integrated with clinical workflows.
            </p>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>⚡</span>
              <h3 style={styles.cardTitle}>How to use</h3>
            </div>
            <ul style={styles.list}>
              <li>Check real-time slots for any doctor</li>
              <li>Secure your booking in seconds</li>
              <li>Instant cancellations via ID</li>
            </ul>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.icon}>💡</span>
              <h3 style={styles.cardTitle}>Try this</h3>
            </div>
            <div style={styles.promptContainer}>
              <code style={styles.prompt}>"Check slots for Dr. Sharma"</code>
              <code style={styles.prompt}>"Book with Dr. Mehta tomorrow 10am"</code>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: INTERACTIVE AREA */}
      <div style={styles.right}>
        <div style={styles.glassWrapper}>
          {children}
        </div>
      </div>
    </div>
  );
};

// 💎 ULTRA-PREMIUM STYLES
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    background: "#020617",
    color: "#f8fafc",
    overflow: "hidden",
    position: "relative",
  },
  
  // Decorative ambient light
  blob1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(59, 130, 246, 0.15)",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px",
    zIndex: 0,
  },
  
  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(147, 51, 234, 0.1)",
    filter: "blur(100px)",
    bottom: "0",
    right: "20%",
    zIndex: 0,
  },

  left: {
    width: "42%",
    padding: "0 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 1,
    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
  },

  brandBadge: {
    background: "rgba(96, 165, 250, 0.1)",
    color: "#60a5fa",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    display: "inline-block",
    marginBottom: "16px",
    border: "1px solid rgba(96, 165, 250, 0.2)",
  },

  title: {
    fontSize: "56px",
    fontWeight: "800",
    margin: "0 0 16px 0",
    letterSpacing: "-1px",
    lineHeight: "1.1",
  },

  tagline: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "460px",
  },

  card: {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "24px",
    borderRadius: "20px",
    marginBottom: "20px",
    transition: "transform 0.2s ease",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },

  icon: {
    fontSize: "20px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    color: "#f1f5f9",
  },

  cardText: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0,
    lineHeight: "1.5",
  },

  list: {
    paddingLeft: "20px",
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.8",
  },

  promptContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },

  prompt: {
    background: "rgba(0,0,0,0.3)",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#3b82f6",
    fontFamily: "monospace",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },

  right: {
    width: "58%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },

  glassWrapper: {
    width: "90%",
    maxWidth: "600px",
    minHeight: "70vh",
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  }
};

export default Layout;