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
      // scroll into last message if messages are overflowed
       messagesRef.current.scrollIntoView({behavior:'smooth'})
    }
  }, [messages]);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;

    // set messages to messages array
    setMessages([...messages, { message: inputText, reply: replyText }]);

    // reset fields
    setInputText('');
    setReplyText('');
  }

  // map messages 
  const messagesMarkup = messages.map((message, i) => 
    // pass all corresponding props 
    <Message 
      key={i} 
      index={i} 
      setIndex={setIndex}
      activeIndex={activeIndex} 
      text={message.message} 
      replyText={message.reply} 
      setReplyText={setReplyText} 
    />);

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
