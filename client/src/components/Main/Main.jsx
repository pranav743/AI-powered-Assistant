// import React, { useContext, useState, useEffect } from 'react'
// import './Main.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context'
// import UploadPanel from '../UploadPanel/UploadPanel'

// const Main = () => {
//   const { 
//     onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     setInput,
//     input,
//     setShowPanel,
//   } = useContext(Context);

//   const [darkMode, setDarkMode] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [messages, setMessages] = useState([]);

//   const startListening = () => {
//     setIsListening(true);
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
    
//     recognition.onstart = () => {
//       console.log('Voice recognition started');
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//       setIsListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error', event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//   };


//   useEffect(() => {
//     document.body.className = darkMode ? 'dark-mode' : 'light-mode';
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleSend = () => {
//     // if (input.trim()) {
//     //   onSent(input);
//     //   setInput('');
//     // }
//     if (input.trim()) {
//       const newMessage = { type: 'user', content: input };
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//       onSent(input);
//       setInput('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     // Add event listener for key press
//     document.addEventListener('keydown', handleKeyPress);
    
//     // Cleanup the event listener on component unmount
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [input]); // Re-run effect if input changes

//   return (
//     <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//       <UploadPanel/>
//       <div className="nav">
//         <p>DataWhiz</p>
//         <div className="nav-right">
//           <button onClick={toggleDarkMode} className="theme-toggle">
//             {darkMode ? '☀️' : '🌙'}
//           </button>
//           <img src={assets.user_icon} alt="" />
//         </div>
//       </div>
//       <div className="main-container">
//         {showResult
//           ? <div className="result">
//               <div className='result-title'>
//                 <img src={assets.user_icon} alt="" />
//                 <p>{recentPrompt}</p>
//               </div>
//               <div className="result-data">
//                 <img src={assets.gemini_icon} alt="" />
//                 {loading
//                   ? <div className="loader">
//                       <hr className="animated-bg" />
//                       <hr className="animated-bg" />
//                       <hr className="animated-bg" />
//                     </div>
//                   : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
//                 }
//               </div>
//             </div>
//           : <>
//               <div className="greet">
//                 <p><span>Hello, User.</span></p>
//                 <p>How can I help you today?</p>
//               </div>
//               {/* <div className="cards">
//                 <div className="card">
//                   <p>Suggest beautiful places to see on an upcoming road trip</p>
//                   <img src={assets.compass_icon} alt="" />
//                 </div>
//                 <div className="card">
//                   <p>Briefly summarize this concept: urban planning</p>
//                   <img src={assets.bulb_icon} alt="" />
//                 </div>
//                 <div className="card">
//                   <p>Brainstorm team bonding activities for our work retreat</p>
//                   <img src={assets.message_icon} alt="" />
//                 </div>
//                 <div className="card">
//                   <p>Improve the readability of the following code</p>
//                   <img src={assets.code_icon} alt="" />
//                 </div>
//               </div> */}
//             </>
//         }

//         <div className="main-bottom">
//           <div className="search-box">
//             <input 
//               onChange={(e) => setInput(e.target.value)} 
//               value={input} 
//               type="text" 
//               placeholder='Enter a prompt here'
//             />
//             <div>
//               <img src={assets.gallery_icon} width={30} alt="" onClick={() => setShowPanel(true)}/>
//               <img src={assets.mic_icon} width={30} alt="" onClick={startListening} className={isListening ? 'listening' : ''}/>
//               {input ? <img onClick={handleSend} src={assets.send_icon} width={30} alt="" /> : null}
//             </div>
//           </div>
//           <p className="bottom-info">
//             Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Main

/* UPDATED */

// import { useContext, useState, useEffect } from 'react'
// import './Main.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context'
// import UploadPanel from '../UploadPanel/UploadPanel'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const CodeFormatter = ({ code, language }) => {
//   return (
//     <SyntaxHighlighter language={language} style={solarizedlight}>
//       {code}
//     </SyntaxHighlighter>
//   );
// };

// const Main = () => {
//   const { 
//     onSent,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     setInput,
//     input,
//     setShowPanel,
//     messages,
//   } = useContext(Context);

//   const [darkMode, setDarkMode] = useState(false);
//   const [isListening, setIsListening] = useState(false);

//   const startListening = () => {
//     setIsListening(true);
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
    
//     recognition.onstart = () => {
//       console.log('Voice recognition started');
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setInput(transcript);
//       setIsListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error', event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//   };


//   useEffect(() => {
//     document.body.className = darkMode ? 'dark-mode' : 'light-mode';
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
 

//   const handleSend = () => {
//     if (input.trim()) {
//       onSent(input);
//       setInput('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     // Add event listener for key press
//     document.addEventListener('keydown', handleKeyPress);
    
//     // Cleanup the event listener on component unmount
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [input]); // Re-run effect if input changes

//   const formatMessage = (message) => {
//     // This is a simple example. You'd need more robust code detection in practice.
//     const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
//     return message.replace(codeRegex, (match, lang, code) => (
//       <CodeFormatter code={code.trim()} language={lang || 'javascript'} />
//     ));
//   };

  

//   return (
//     <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
//       <UploadPanel/>
//       <div className="nav">
//         <p>DataWhiz</p>
//         <div className="nav-right">
//           <button onClick={toggleDarkMode} className="theme-toggle">
//             {darkMode ? '☀️' : '🌙'}
//           </button>
//           <img src={assets.user_icon} alt="" />
//         </div>
//       </div>
//       <div className="main-container">
//         {showResult ? (
//           <div className="result">
//             {messages.map((message, index) => (
//               <div key={index} className={`message ${message.type}`}>
//                 <div className='message-title'>
//                   <img src={message.type === 'user' ? assets.user_icon : assets.gemini_icon} alt="" />
//                   <p>{message.type === 'user' ? 'You' : 'DataWhiz'}</p>
//                 </div>
//                 <div className="message-content">
//                   {message.type === 'ai' && loading && index === messages.length -1 ? (
//                     <div className="loader">
//                       <hr className="animated-bg" />
//                       <hr className="animated-bg" />
//                       <hr className="animated-bg" />
//                     </div>
//                   ) : (
//                     <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="greet">
//               <p><span>Hello, User.</span></p>
//               <p>How can I help you today?</p>
//             </div>
//           </>
//         )}

//         <div className="main-bottom">
//           <div className="search-box">
//             <input 
//               onChange={(e) => setInput(e.target.value)} 
//               value={input} 
//               type="text" 
//               placeholder='Enter a prompt here'
//             />
//             <div>
//               <img src={assets.gallery_icon} width={30} alt="" onClick={() => setShowPanel(true)}/>
//               <img src={assets.mic_icon} width={30} alt="" onClick={startListening} className={isListening ? 'listening' : ''}/>
//               {input ? <img onClick={handleSend} src={assets.send_icon} width={30} alt="" /> : null}
//             </div>
//           </div>
//           <p className="bottom-info">
//             Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Main

/* LAST WALA */

import { useContext, useState, useEffect } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import UploadPanel from '../UploadPanel/UploadPanel'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeFormatter = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedlight}>
      {code}
    </SyntaxHighlighter>
  );
};

const Main = () => {
  const { 
    onSent,
    showResult,
    loading,
    setInput,
    input,
    setShowPanel,
    messages,
  } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { type: 'user', content: input };
      onSent(input, newMessage);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  const formatMessage = (message) => {
    const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(message)) !== null) {
      if (match.index > lastIndex) {
        parts.push(message.slice(lastIndex, match.index));
      }
      const [, lang, code] = match;
      parts.push(
        <CodeFormatter key={match.index} code={code.trim()} language={lang || 'javascript'} />
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < message.length) {
      parts.push(message.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className={`main ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <UploadPanel/>
      <div className="nav">
        <p>DataWhiz</p>
        <div className="nav-right">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <img src={assets.user_icon} alt="" />
        </div>
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className='message-title'>
                  <img src={message.type === 'user' ? assets.user_icon : assets.gemini_icon} alt="" />
                  <p>{message.type === 'user' ? 'You' : 'DataWhiz'}</p>
                </div>
                <div className="message-content">
                  {formatMessage(message.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message ai">
                <div className='message-title'>
                  <img src={assets.gemini_icon} alt="" />
                  <p>DataWhiz</p>
                </div>
                <div className="message-content">
                  <div className="loader">
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="greet">
            <p><span>Hello, User.</span></p>
            <p>How can I help you today?</p>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input} 
              type="text" 
              placeholder='Enter a prompt here'
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" onClick={() => setShowPanel(true)}/>
              <img src={assets.mic_icon} width={30} alt="" onClick={startListening} className={isListening ? 'listening' : ''}/>
              {input ? <img onClick={handleSend} src={assets.send_icon} width={30} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            DataWhiz may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main