import { createContext, useState } from "react";
import run from "./../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [previousPrompt, setpreviousPrompt] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);

  const [resultData, setresultData] = useState("");

  const ResetData = () => {
    setloading(true)
   setshowResult(false)

  }

  const onSent = async (prompt) => {
    console.log(prompt)
        setresultData("");
        setloading(true);
        setshowResult(true);
        let response;
        if (prompt!== undefined &&!(prompt instanceof Object)) {
    
          response = await run(prompt);
            setinput('')
          console.log(input)
          setrecentPrompt(prompt);
          setChatHistory(prev => [...prev, {
  role: "user",
  content: prompt
}]);


        } else {
          setpreviousPrompt((prev) => [...prev, input]);
          setrecentPrompt(input);
          setChatHistory(prev => [...prev, {
  role: "user",
  content: input
}]);

          response =  await run(input);
        
        }
    
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
          } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
          }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delayPara(i, nextWord + " ");
        }
        setloading(false);
        setinput("");
        setChatHistory(prev => [...prev, {
  role: "bot",
  content: newResponse2   // bot message with formatting
}]);

      };
  console.log(previousPrompt);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

 

  const contextValue = {
    previousPrompt,
    setpreviousPrompt,
    onSent,
    input,
    setinput,
    recentPrompt,
    setrecentPrompt,
    showResult,
    setshowResult,
    loading,
    setloading,
    resultData,
    setresultData,
    ResetData,
    chatHistory
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};
export default ContextProvider;
