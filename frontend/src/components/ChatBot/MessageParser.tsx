import React from "react";

function MessageParser({ children, actions }: any) {
  const parse = (message: string) => {
    console.log(message);
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions,
        });
      })}
    </div>
  );
}

export default MessageParser;
