import React, { useState } from "react";
import { createClientMessage } from "react-chatbot-kit";

function ActionProvider({ createChatBotMessage, setState, children }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const handleOk = () => {
    console.log("heee");

    const clientMessage = createClientMessage("Got it.", {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));

    const promptMessage = createChatBotMessage("Pick a slot!");
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, promptMessage],
    }));

    setIsClicked(true);
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOk,
            isClicked,
          },
        });
      })}
    </div>
  );
}

export default ActionProvider;
