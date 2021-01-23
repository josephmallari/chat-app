import React, { useState  } from 'react';
import Message from './Message';
import './App.css';

// container
// message
// reply to own message
function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessages([...messages, inputText]);
    setInputText('');
  }

  const messagesMarkup = messages.map((message, i) => <Message key={i} text={message}/>);

  return (
    <div className="App">
      <div className="wrapper">
        <header className="user">
          <h3 className="user__name">User</h3>
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
