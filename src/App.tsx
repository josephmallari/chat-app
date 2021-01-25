import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import './App.css';

interface Messages {
  message: string
  reply: string
}

function App() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [activeIndex, setIndex] = useState<number>(0);
  const messagesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (messagesRef && messagesRef.current) {
       messagesRef.current.scrollIntoView({behavior:'smooth'})
    }
  }, [messages]);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;

    setMessages([...messages, { message: inputText, reply: replyText}]);

    setInputText('');
    setReplyText('');
  }

  const messagesMarkup = messages.map((message, i) => 
  <Message key={i} index={i} text={message.message} replyText={message.reply} 
  activeIndex={activeIndex} setReplyText={setReplyText} setIndex={setIndex}/>);

  return (
    <div className="chat-app">
      <div className="user-input">
        Enter User Name: 
        <input type="text" onChange={(e) => setUserName(e.target.value)}/>
      </div>
      <div className="chat-wrapper">
        <div className="user">
          <h3 className="user__name">{userName}</h3>
        </div>
        <div className="messages">
          {messagesMarkup}
          <span ref={messagesRef}></span>
        </div>
        <div className="submit-wrapper">
          <form onSubmit={submitMessage}>
            <input value={inputText} type="text" onChange={(e) => setInputText(e.target.value)}/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
