import React, { useEffect, useState } from "react";

const LiterasiPage = () => {
  const [showBot, setShowBot] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBot(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#3c40d0", marginBottom: "10px" }}>
        Literasi CashMate 🤖
      </h1>
      <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>
        Ketik pertanyaan seputar aplikasi atau tips manajemen keuangan
      </p>
      <div
        style={{
          width: "100%",
          height: "700px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {showBot && (
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/tt2-wJsiH5PzpEbqazatH"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="CashMate Literasi Bot"
            allow="clipboard-write"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default LiterasiPage;
