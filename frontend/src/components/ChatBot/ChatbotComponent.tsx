import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import "react-chatbot-kit/build/main.css";
import { config } from "./Config";
import "./Chatbot.css";

function ChatbotComponent() {
  return (
    <div className="">
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
}

export default ChatbotComponent;
