// import { createContext, useState } from "react";
// import runChat from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {

//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");
//     const [showPanel, setShowPanel] = useState(false);
    

//     function delayPara(index, nextWord) {
//         setTimeout(function () {
//             setResultData(prev => prev + nextWord)
//         }, 75 * index);
//     }

//     const onSent = async (prompt) => {

//         setResultData("")
//         setLoading(true)
//         setShowResult(true)
//         let response;   
//         if (prompt !== undefined) {
//             response = await runChat(prompt);
//             setRecentPrompt(prompt)
//         }
//         else {
//             setPrevPrompts(prev => [...prev, input]);
//             setRecentPrompt(input)
//             response = await runChat(input);
//         }
//         let responseArray = response.split('**');
//         let newArray = "";
//         for (let i = 0; i < responseArray.length; i++) {
//             if (i === 0 || i % 2 !== 1) {
//                 newArray += responseArray[i]
//             }
//             else {
//                 newArray += "<b>" + responseArray[i] + "</b>"
//             }
//         }
//         console.log(newArray);
//         responseArray = newArray.split('*').join("</br>").split(" ");
//         for (let i = 0; i < responseArray.length; i++) {
//             const nextWord = responseArray[i];
//             delayPara(i, nextWord + " ")
//         }
//         setLoading(false);
//         setInput("")

//     }

//     const newChat = async () => {
//         setLoading(false);
//         setShowResult(false);
//     }


//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat,
//         showPanel,
//         setShowPanel
//     }

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider

import { createContext, useState } from "react";
import runChat from "../config/gemini";
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [showPanel, setShowPanel] = useState(false);
    const [messages, setMessages] = useState([]); // New state for messages

    function delayPara(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const askQuestion = async (q) => {
        try {
            const response = await axios.post("http://localhost:5000/ask-question/", {question: q})
            console.log(response.data.response)
            return response.data.response;
        } catch (error) {
            return "There was an Error"
        }
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;   
        if (prompt !== undefined) {
            setRecentPrompt(prompt)
            // response = await runChat(prompt);
            response = await askQuestion(prompt);            
            
            // Add user message to messages
            setMessages(prev => [...prev, { type: 'user', content: prompt }]);
        }
        else {
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input)
            response = await runChat(input);
            // Add user message to messages
            setMessages(prev => [...prev, { type: 'user', content: input }]);
        }
        let responseArray = response.split('**');
        let newArray = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responseArray[i]
            }
            else {
                newArray += "<b>" + responseArray[i] + "</b>"
            }
        }
        console.log(newArray);
        responseArray = newArray.split('*').join("</br>").split(" ");
        let fullResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            // const nextWord = responseArray[i];
            // delayPara(i, nextWord + " ")
            const nextWord = responseArray[i];
            fullResponse += nextWord + " ";
            delayPara(i, nextWord + " ")
        }
        // Add AI response to messages
        setMessages(prev => [...prev, { type: 'ai', content: fullResponse }]);
        setLoading(false);
        setInput("")
    }

    const newChat = async () => {
        setLoading(false);
        setShowResult(false);
        setMessages([]); // Clear messages when starting a new chat
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        showPanel,
        setShowPanel,
        messages, // Add messages to context
        setMessages // Add setMessages to context
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider