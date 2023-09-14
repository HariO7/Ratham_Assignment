import moment from "moment";
import { ReactElement } from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const dates = [
  moment().format("ddd MMM do"),
  moment().add("1", "days").format("ddd MMM do"),
  moment().add("2", "days").format("ddd MMM do"),
];

const options = Array.from({ length: 16 }, (_, index) => 5 + index);

export const config = {
  botName: "Hive",
  initialMessages: [
    createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget: "okButton",
    }),
  ],
  widgets: [
    {
      widgetName: "okButton",
      widgetFunc: (props: any) => {
        return (props.actionProvider.stage === "OK" && (
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
    {
      widgetName: "selectDate",
      widgetFunc: (props: any) => {
        return (props.actionProvider.stage === "DATE" && (
          <div className="flex flex-wrap scroll-my-2 cursor-pointer">
            {dates.map((date, index) => {
              return (
                <div
                  key={index}
                  className="border border-blue-500 p-2 m-2 text-center rounded-full"
                  onClick={() => {
                    props.actionProvider.handleDateSelection(date);
                  }}
                >
                  {date}
                </div>
              );
            })}
          </div>
        )) as ReactElement;
      },
      mapStateToProps: [""],
      props: {},
    },
    {
      widgetName: "dropdownAge",
      widgetFunc: (props: any) => {
        return (props.actionProvider.stage === "AGE" && (
          <select
            onChange={(e) =>
              props.actionProvider.handleAgeSelection(e.target.value)
            }
          >
            <option value="">Select Age</option>
            {options.map((age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            ))}
          </select>
        )) as ReactElement;
      },
      mapStateToProps: [""],
      props: {},
    },
  ],
};
