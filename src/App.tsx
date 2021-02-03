import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import './App.css';

interface Messages {
  message: string,
  replies: string[]
}

function App() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [replyState, setReplyState] = useState<boolean>(false);
  const messagesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (messagesRef && messagesRef.current) {

      // scroll into last message if messages are overflowed
       messagesRef.current.scrollIntoView({behavior:'smooth'})
    }
  }, [messages]);

  function toggleReplyState(index: number) {
    setReplyState(prevState => !prevState);
    setActiveIndex(index);
  }

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;

    // push to replies array when replystate is active
    if (replyState && activeIndex >= 0) {

      // copy of messages
      let messagesArray = [...messages];

      // find index on array and push replies to replies array
      messagesArray[activeIndex].replies.push(inputText);

      // update setMesages state
      setMessages(messagesArray);
    } 
    else {
      setMessages([...messages, { message: inputText, replies: []}]);
    }

    // reset fields
    setInputText('');
    setReplyState(false);
  }

  // // map messages 
  const messagesMarkup = messages.map((message, i) => 

    // pass all corresponding props 
    <Message 
      key={i} 
      index={i} 
      text={message.message}
      activeIndex={activeIndex}
      replies={message.replies.length > 0 ? message.replies : null}
      toggleReplyState={toggleReplyState}
      replyState={replyState}
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
