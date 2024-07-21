// import { useContext, useState, useEffect } from 'react'
// import './Main.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context'
// import UploadPanel from '../UploadPanel/UploadPanel'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import ReactMarkdown from 'react-markdown'

// const CodeFormatter = ({ code, language }) => {
//   return (
//     <SyntaxHighlighter language={language} style={solarizedlight}>
//       {code}
//     </SyntaxHighlighter>
//   );
// };

// const CustomParagraph = ({ children }) => (
//   <p style={{ marginBottom: '10px' }}>{children}</p>
// );

// const CustomStrong = ({ children }) => (
//   <strong style={{ fontWeight: 'bold' }}>{children}</strong>
// );

// const CustomBreak = () => <br />;

// const formatMessage = (message) => {
//   const components = {
//     p: CustomParagraph,
//     strong: CustomStrong,
//     br: CustomBreak,
//     code: ({ node, ...props }) => <code style={{ backgroundColor: '#f4f4f4', padding: '2px 4px', borderRadius: '4px' }} {...props} />
//   };

//   const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = codeRegex.exec(message)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push(
//         <ReactMarkdown key={`text-${match.index}`} components={components}>
//           {message.slice(lastIndex, match.index)}
//         </ReactMarkdown>
//       );
//     }
//     const [, lang, code] = match;
//     parts.push(
//       <CodeFormatter key={`code-${match.index}`} code={code.trim()} language={lang || 'javascript'} />
//     );
//     lastIndex = match.index + match[0].length;
//   }

//   if (lastIndex < message.length) {
//     parts.push(
//       <ReactMarkdown key={`text-${lastIndex}`} components={components}>
//         {message.slice(lastIndex)}
//       </ReactMarkdown>
//     );
//   }

//   return parts;
// };

// const Main = () => {
//   const { 
//     onSent,
//     showResult,
//     loading,
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
//       const newMessage = { type: 'user', content: input };
//       onSent(input, newMessage);
//       setInput('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyPress);
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [input]);

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
//                   {formatMessage(message.content)}
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="message ai">
//                 <div className='message-title'>
//                   <img src={assets.gemini_icon} alt="" />
//                   <p>DataWhiz</p>
//                 </div>
//                 <div className="message-content">
//                   <div className="loader">
//                     <hr className="animated-bg" />
//                     <hr className="animated-bg" />
//                     <hr className="animated-bg" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="greet">
//             <p><span>Hello, User.</span></p>
//             <p>How can I help you today?</p>
//           </div>
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
//             DataWhiz may display inaccurate info, including about people, so double-check its responses.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Main

import { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import UploadPanel from '../UploadPanel/UploadPanel';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeFormatter = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedlight}>
      {code}
    </SyntaxHighlighter>
  );
};

const CustomParagraph = ({ children }) => (
  <p style={{ marginBottom: '10px' }}>{children}</p>
);

const CustomStrong = ({ children }) => (
  <strong style={{ fontWeight: 'bold' }}>{children}</strong>
);

// const CustomBreak = () => <br/>;

const CustomListItem = ({ children }) => (
  <li style={{ marginBottom: '5px' }}>{children}</li>
);

const CustomList = ({ children }) => (
  <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>{children}</ul>
);

const formatMessage = (message) => {
  const components = {
    p: CustomParagraph,
    strong: CustomStrong,
    br: '<br>',
    li: CustomListItem,
    ul: CustomList,
    b: <b></b>,
    code: ({ node, ...props }) => <code style={{ backgroundColor: '#f4f4f4', padding: '2px 4px', borderRadius: '4px' }} {...props} />,
  };

  const codeRegex = /```(\w+)?\s*([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <ReactMarkdown key={`text-${match.index}`} components={components} remarkPlugins={[remarkGfm]}>
          {message.slice(lastIndex, match.index)}
        </ReactMarkdown>
      );
    }
    const [, lang, code] = match;
    parts.push(
      <CodeFormatter key={`code-${match.index}`} code={code.trim()} language={lang || 'javascript'} />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < message.length) {
    parts.push(
      <ReactMarkdown key={`text-${lastIndex}`} components={components} remarkPlugins={[remarkGfm]}>
        {message.slice(lastIndex)}
      </ReactMarkdown>
    );
  }

  return parts;
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
  );
};

export default Main;
