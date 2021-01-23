import React, { ReactElement } from 'react'

interface Props {
  text: string;
}

export default function Message({text}: Props): ReactElement {
  return (
    <div className="message">
     {text} 
    </div>
  )
}
