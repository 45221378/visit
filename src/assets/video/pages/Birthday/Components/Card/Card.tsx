import { ReactNode } from 'react'
import './Card.scoped.scss'

type Props = {
  children: ReactNode
  title?: string
  title2?: string
  pad?: string
}

const CardOne = ({ children, title, pad }: Props) => {
  return (
    <div className={`${pad} card-one`}>
      {title && <div className="title">{title}</div>}
      <div className="card-child">{children}</div>
    </div>
  )
}

const CardTwo = ({ children, title, title2, pad }: Props) => {
  return (
    <div className={`${pad} card-two`}>
      {title && <div className="title">{title}</div>}
      {title2 && <div className="title2">{title2}</div>}
      <div className="card-child">{children}</div>
    </div>
  )
}

export { CardOne, CardTwo }
