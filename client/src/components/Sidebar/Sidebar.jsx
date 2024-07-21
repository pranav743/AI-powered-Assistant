// import { useContext, useState } from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context';

// const Sidebar = () => {

//     const [extended, setExtended] = useState(false);
//     const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);

//     const loadPrompt = async (prompt) => {
//         await onSent(prompt);
//         setRecentPrompt(prompt);
//     } 

//     return (
//         <div className='sidebar'>
//             <div className="top">
//                 <img src={assets.menu_icon} alt="" className="menu" onClick={() => setExtended(prev => !prev)} />
//                 <div onClick={()=>newChat()} className="new-chat">
//                     <img src={assets.plus_icon} alt="" />
//                     {extended ? <p>New Chat</p> : null}
//                 </div>
//                 {extended
//                     ? <div className="recent">
//                         <p className='recent-title'>Recent</p>
//                         {prevPrompts.map((item,index)=>(
//                             <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
//                             <img src={assets.message_icon} alt="" />
//                             <p>{item.slice(0,18)} {"..."}</p>
//                         </div>
//                         ))}
//                     </div>
//                     : null}
//             </div>
//             {/* <div className="bottom">
//                 <div className="bottom-item recent-entry">
//                     <img src={assets.question_icon} alt="" />
//                     {extended ? <p>Help</p> : null}
//                 </div>
//                 <div className="bottom-item recent-entry">
//                     <img src={assets.history_icon} alt="" />
//                     {extended ? <p>Activity</p> : null}
//                 </div>
//                 <div className="bottom-item recent-entry">
//                     <img src={assets.setting_icon} alt="" />
//                     {extended ? <p>Settings</p> : null}
//                 </div>
//             </div> */}
//         </div>
//     )
// }

// export default Sidebar

/* NEW CODE AFTER CHANGES */

// import { useContext, useState, useEffect } from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { Context } from '../../context/Context';

// const Sidebar = () => {
//     const [extended, setExtended] = useState(true);
//     const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

//     useEffect(() => {
//         const sidebar = document.querySelector('.sidebar');
//         const newchat = document.querySelector('.new-chat');
//         if (sidebar) {
//             sidebar.style.width = extended ? '250px' : '80px';
//         }
//         if (newchat) {
//             newchat.style.width = extended ? '200px' : '53px';
//         }s
//     }, [extended]);

//     const loadPrompt = async (prompt) => {
//         await onSent(prompt);
//         setRecentPrompt(prompt);
//     }

//     return (
//         <div className='sidebar'>
//             <div className="top">
//                 <img src={assets.menu_icon} alt="" className="menu" onClick={() => setExtended(prev => !prev)} />
//                 <div onClick={()=>newChat()} className="new-chat">
//                     <img src={assets.plus_icon} alt="" />
//                     {extended ? <p>New Chat</p> : null}
//                 </div>
//                 {extended
//                     ? <div className="recent">
//                         <p className='recent-title'>Recent</p>
//                         {prevPrompts.map((item,index)=>(
//                             <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
//                             <img src={assets.message_icon} alt="" />
//                             <p>{item.slice(0,18)} {"..."}</p>
//                         </div>
//                         ))}
//                     </div>
//                     : null}
//             </div>
//         </div>
//     )
// }

// export default Sidebar

import { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat,getSummary } = useContext(Context);

    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        const newChatButton = document.querySelector('.new-chat');
        if (sidebar) {
            sidebar.style.width = extended ? '250px' : '80px';
        }
        if (newChatButton) {
            newChatButton.style.width = extended ? '200px' : '53px';
        }
    }, [extended]);

    const loadPrompt = async (prompt) => {
        await onSent(prompt);
        setRecentPrompt(prompt);
    };

    useEffect(() => {
        console.log('prevPrompts updated:', prevPrompts);
    }, [prevPrompts]);

    return (
        <div className='sidebar'>
            <div className="top">
                <img
                    src={assets.menu_icon}
                    alt=""
                    className="menu"
                    onClick={() => setExtended(prev => !prev)}
                />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                <div onClick={ ()=> getSummary() } className="new-summary">
                    <img src={assets.summary_icon} alt="" />
                    {extended ? <p>Get Summary</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        {/* <p className='recent-title'>Recent</p> */}
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0, 18)} {"..."}</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Sidebar;
