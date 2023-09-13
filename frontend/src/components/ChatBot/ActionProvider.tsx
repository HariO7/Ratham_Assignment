import React, { useState } from "react";
import { createClientMessage } from "react-chatbot-kit";

const stages = { OK: "OK", DATE: "DATE",NAME:"NAME", AGE: "AGE" };

function ActionProvider({ createChatBotMessage, setState, children }: any) {
  const [stage, setStage] = useState(stages.OK);

  const handleOk = () => {
    const clientMessage = createClientMessage("Got it.", {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));

    setStage(stages.DATE);

    window.document
      .getElementsByClassName("react-chatbot-kit-chat-input")[0]
      .setAttribute("disabled", "true");

    const dateSelection = createChatBotMessage("Pick a slot!", {
      widget: "selectDate",
    });
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, dateSelection],
    }));
  };

  const handleDateSelection = (date: string) => {
    const clientMessage = createClientMessage(date, {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));

    window.document
      .getElementsByClassName("react-chatbot-kit-chat-input")[0]
      .setAttribute("disabled", "false");

    setStage(stages.AGE);


  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOk,
            handleDateSelection,
            stage
          },
        });
      })}
    </div>
  );
}

export default ActionProvider;
