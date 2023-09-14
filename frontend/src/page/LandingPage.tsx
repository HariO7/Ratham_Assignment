import React from "react";
import ChatbotComponent from "../components/ChatBot/ChatbotComponent";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatBot } from "../store/chatSlice";

function LandingPage() {
  // const [showChatBot, setSetshowChatBot] = useState(false);
  const showChatBot = useSelector(
    (state: any) => state.chatHandler.showChatBot
  );
  const name = useSelector((state: any) => state.chatHandler.name);
  const age = useSelector((state: any) => state.chatHandler.age);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex justify-center items-center">
      {showChatBot ? (
        <ChatbotComponent />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {name && age
              ? `Your name ${name} aged ${age} has been added to student system. You may now exit.
`
              : `Welcome to the Student Info System`}
          </h1>
          {name === "" && age === 0 && (
            <>
              <p className="text-lg">Enter into Student Info System</p>
              <button
                onClick={() => dispatch(toggleChatBot(true))}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Enter
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
