import './Card.scoped.scss'
import { FC, ReactNode } from 'react'

const Card: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="card">
      <div className="card-chid">{children}</div>
    </div>
  )
}

export default Card
