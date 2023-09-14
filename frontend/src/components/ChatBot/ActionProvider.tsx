import React, { useState } from "react";
import { createClientMessage } from "react-chatbot-kit";
import { useDispatch } from "react-redux";
import { addAge, addName, toggleChatBot } from "../../store/chatSlice";

const stages = {
  OK: "OK",
  DATE: "DATE",
  NAME: "NAME",
  AGE: "AGE",
  EXIT: "EXIT",
};

function ActionProvider({ createChatBotMessage, setState, children }: any) {
  const [stage, setStage] = useState(stages.OK);
  const dispatch = useDispatch();

  const handleOk = () => {
    const clientMessage = createClientMessage("Got it.", {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));

    setStage(stages.DATE);

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

    setStage(stages.NAME);

    const nameMessage = createChatBotMessage("Enter your Name");

    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, nameMessage],
    }));
  };

  const handleNameEntry = (name: string) => {
    dispatch(addName(name));

    setStage(stages.AGE);

    const clientMessage = createClientMessage("Select your Age", {
      widget: "dropdownAge",
    });
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));
  };

  const handleAgeSelection = (age: number) => {
    dispatch(addAge(age));

    const clientMessage = createClientMessage(`${age}`, {});
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));

    setStage(stages.EXIT);

    const exitMessage = createChatBotMessage(
      "Thank you. In 5 seconds, bot will exit"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, exitMessage],
    }));

    setTimeout(() => {
      dispatch(toggleChatBot(false));
    }, 5000);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOk,
            handleDateSelection,
            handleNameEntry,
            handleAgeSelection,
            stage,
          },
        });
      })}
    </div>
  );
}

export default ActionProvider;
