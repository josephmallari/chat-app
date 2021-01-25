import { ReactElement } from 'react'

interface Props {
  replyText: string
}

export default function Reply({replyText}: Props): ReactElement {
  return (
    <div className="reply">{replyText}</div>
  )
}