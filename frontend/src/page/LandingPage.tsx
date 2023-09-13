import React, { useState } from "react";
import ChatbotComponent from "../components/ChatBot/ChatbotComponent";

function LandingPage() {
  const [showChatBot, setSetshowChatBot] = useState(false);
  return (
    <div className="min-h-screen flex justify-center items-center">
      {showChatBot ? (
        <ChatbotComponent />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Student Info System
          </h1>
          <p className="text-lg">Enter into Student Info System</p>
          <button
            onClick={() => setSetshowChatBot(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Enter
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
