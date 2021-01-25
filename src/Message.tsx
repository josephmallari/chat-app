import { ReactElement, useState, useRef, useEffect } from 'react'
import Reply from './Reply';

interface Props {
  text: string,
  replyText: string,
  index: number,
  activeIndex: number,
  setReplyText: (replyText: string) => void,
  setIndex: (index: number) => void,
}

export default function Message({text, replyText, index, activeIndex, setReplyText, setIndex}: Props): ReactElement {
  const [replyState, setReplyState] = useState<boolean>(false);
  const replyRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // toggle reply state
  function toggleReplyState() {
    setReplyState(!replyState);

    // get index to match active state
    setIndex(index);

    // set reply text when replyState is true
    if (replyRef && replyRef.current) {
      setReplyText(replyRef.current.innerText);
    }
  }

  const activeClass = 'replyState';

  useEffect(() => {
    // set active class when active index and current index is true
    if (replyState && activeIndex === index) {
      messageRef.current?.classList.add(activeClass)
    } 
    // otherwise default back to false state and remove class
    else {
      messageRef.current?.classList.remove(activeClass)
      setReplyState(false);
    }
  },[replyState, activeIndex, index]);

  // check if reply text is not null, if not, add reply component
  const reply = replyText ? <Reply replyText={replyText} /> : null;

  return (
    <div ref={messageRef} onClick={toggleReplyState} className='message'>
      {reply}
      <div ref={replyRef} className="message__text">{text}</div>
    </div>
  )
}
