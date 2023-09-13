import React from "react";
import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { config } from "./Config";

function ChatbotComponent() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
}

export default ChatbotComponent;
