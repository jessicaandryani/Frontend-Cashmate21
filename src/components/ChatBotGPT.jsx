import React, { useEffect, useState } from "react";

const ChatBotGPT = () => {
  const [showBot, setShowBot] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBot(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-[700px] shadow-xl rounded-xl overflow-hidden border border-gray-200">
      {showBot && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/_We2n80J8lBaKHlTqbKnm?hideTitle=true"
          width="100%"
          style={{ height: "100%", border: "none" }}
          title="CashMate Literasi Bot"
          allow="clipboard-write"
        ></iframe>
      )}
    </div>
  );
};

export default ChatBotGPT;
