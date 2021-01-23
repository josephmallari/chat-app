import React, { ReactElement, useState, useRef } from 'react'

interface Props {
  text: string
}

// on click blur all elements
export default function Message({text}: Props): ReactElement {
  const [replyState, setReplyState] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const replyRef = useRef<HTMLDivElement>(null);

  function reply() {
    setReplyState(!replyState);
    document.querySelectorAll('.message').forEach(message => message.classList.add('blur'));

    if (replyRef && replyRef.current) {
      replyRef.current.classList.remove('blur');
      setReplyText(replyRef.current.innerHTML);
    }
  }

  const replyClass = '';
  // const replyClass = replyState ? ' blur' : '';

  return (
    <div ref={replyRef} onClick={reply} className={`message${replyClass}`}>
     {text} 
    </div>
  )
}
