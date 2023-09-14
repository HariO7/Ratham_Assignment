import React, { Children } from "react";

function MessageParser({ children, actions }: any) {
  const parse = (message: string) => {
    if (actions.stage === "NAME") {
      actions.handleNameEntry(message);
    }
  };
  return (
    <div>
      {Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions,
        });
      })}
    </div>
  );
}

export default MessageParser;
