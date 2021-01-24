import React, { useState , useEffect} from 'react';
import Message from './Message';
import './App.css';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  function triggerLastReplied() {
    const messageArray = document.querySelectorAll('.message');
    const replyState = document.querySelector('.replyState');

    if (replyState) {
      replyState.classList.remove('replyState');

      for (let i =0;i < messageArray.length;i++) {
        if (i === messageArray.length - 2) {
          messageArray[i].classList.add('replied');
        }
      }
    }
  }

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;

    if (replyText) {
      setMessages(prevMessages => [...prevMessages, replyText]);
      setReplyText('');
    }

    setMessages(prevMessages => [...prevMessages, inputText]);
    setInputText('');
  }

  function getReplyText(replyText: string) {
    setReplyText(replyText);
  }

  useEffect(() => {
    if (document.querySelector('.replyState')) {
      triggerLastReplied();
    }
  }, [messages]);


  const messagesMarkup = messages.map((message, i) => <Message key={i} text={message} getReplyText={getReplyText} />);

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
