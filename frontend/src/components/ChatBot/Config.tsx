import { ReactElement } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";

export const config: IConfig = {
  botName: "Hive",
  initialMessages: [
    createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget: "okButton",
    }),
  ],
  widgets: [
    {
      widgetName: "okButton",
      widgetFunc: (props) => {
        return (!props.actionProvider.isClicked && (
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={props.actionProvider.handleOk}
          >
            Got it!
          </button>
        )) as ReactElement;
      },
      mapStateToProps: [""],
      props: {},
    },
  ],
};
