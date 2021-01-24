import React, { useState , useEffect} from 'react';
import Message from './Message';
import './App.css';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    if (document.querySelector('.blur')) {
      document.querySelectorAll('.message').forEach(blur => {
        blur.classList.remove('blur');
      });

      triggerLastReplied();
    }
  }, [messages]);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessages([...messages, inputText]);
    setInputText('');
  }

  function triggerLastReplied() {
      const messageArray = document.querySelectorAll('.message');
      console.log(messageArray);
      for (let i = 0;i < messageArray.length;i++) {
        if (i === messageArray.length - 1) {
          console.log('do you run');
          messageArray[i].classList.add('replied');
        }
      }
  }

  const messagesMarkup = messages.map((message, i) => <Message key={i} text={message}/>);

  return (
    <div className="App">
      <div className="wrapper">
        <header className="user">
          <h3 className="user__name">Joseph Mallari</h3>
        </header>
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
