import { ReactElement, useState, useRef, useEffect } from 'react'

interface Props {
  text: string,
  getReplyText: (replyText: string) => void 
}

export default function Message({text, getReplyText}: Props): ReactElement {
  const [replyState, setReplyState] = useState<boolean>(false);
  const replyRef = useRef<HTMLDivElement>(null);

  function toggleReplyState() {
    setReplyState(!replyState);
  }

  useEffect(() => {
    if (replyState) {
      document.querySelectorAll('.message').forEach(message => message.classList.add('blur'));

      if (replyRef && replyRef.current) {
        replyRef.current.classList.remove('blur');

        getReplyText(replyRef.current.innerHTML)
      }
    }
    else {
      document.querySelectorAll('.message').forEach(message => message.classList.remove('blur'));
    }
  }, [replyState]);

  const replyStateClass = replyState ? ' replyState' : '';

  return (
    <div ref={replyRef} onClick={toggleReplyState} className={`message${replyStateClass}`}>
     {text} 
    </div>
  )
}
