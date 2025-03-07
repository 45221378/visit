import './Modal.scoped.css'
import { type ReactNode } from 'react'
import createModal from '/common/components/createModal/createModal'

type Props = { title?: string; children: ReactNode; onClose: () => void }

function Modal(props: Props) {
  const { children, title, onClose } = props
  return (
    <div className="container">
      {title && <div className="title">{title}</div>}
      <div className="content">{children}</div>
      <button type="button" className="close" onClick={onClose} />
    </div>
  )
}

export default createModal(Modal)
