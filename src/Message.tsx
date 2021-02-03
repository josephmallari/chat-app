import { ReactElement } from 'react'

interface Props {
  text: string,
  index: number,
  activeIndex: number | null,
  replies: string[] | null,
  replyState: boolean,
  toggleReplyState: (index: number) => void
}

export default function Message({text, index, activeIndex, replies, replyState, toggleReplyState}: Props): ReactElement {

  let replyMarkup;

  if (replies) {
    replyMarkup = replies.map((reply, i) => <div style={{ marginLeft: `${10 * (i+1)}px` }}className="reply" key={i}>{reply}</div>);
  }

  const activeClass = activeIndex === index && replyState ? ' replyState' : '';

  return (
    <div onClick={() => toggleReplyState(index)} className={`message ${activeClass}`}>
      <div className="message__text">{text}</div>
      {replyMarkup}
    </div>
  )
}
