import { ReactElement, useState, useRef } from 'react'

interface Props {
  text: string
}

export default function Message({text}: Props): ReactElement {
  const [replyState, setReplyState] = useState<boolean>(false);
  const replyRef = useRef<HTMLDivElement>(null);

  function reply() {
    setReplyState(!replyState);
    document.querySelectorAll('.message').forEach(message => message.classList.add('blur'));

    if (replyRef && replyRef.current) {
      replyRef.current.classList.remove('blur');
      replyRef.current.classList.add('replied');
    }
  }

  return (
    <div ref={replyRef} onClick={reply} className='message'>
     {text} 
    </div>
  )
}
