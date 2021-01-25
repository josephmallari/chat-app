import { ReactElement, useState, useRef, useEffect } from 'react'
import Reply from './Reply';

interface Props {
  text: string,
  replyText: string,
  setReplyText: (replyText: string) => void,
  index: number,
  setIndex: (index: number) => void,
  activeIndex: number
}

export default function Message({text, replyText, index, activeIndex, setReplyText, setIndex}: Props): ReactElement {
  const [replyState, setReplyState] = useState<boolean>(false);
  const replyRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  function toggleReplyState() {
    setReplyState(!replyState);
    setIndex(index);

    if (replyRef && replyRef.current) {
      setReplyText(replyRef.current.innerText);
    }
  }

  const activeClass = 'replyState';

  useEffect(() => {
    if (replyState && activeIndex === index) {
      messageRef.current?.classList.add(activeClass)
    } else {
      messageRef.current?.classList.remove(activeClass)
      setReplyState(false);
    }
  });

  console.log(replyState, index);

  const reply = replyText ? <Reply replyText={replyText} /> : null;

  return (
    <div ref={messageRef} onClick={toggleReplyState} className='message'>
      {reply}
      <div ref={replyRef} className="message__text">{text}</div>
    </div>
  )
}
