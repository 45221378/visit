import './Modal.scoped.css'
import { type FC, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IModal<P> extends FC {
  show: (data: P) => void
  hide: () => void
}

export default function createModal<P>(Content: FC<P>) {
  const Modal: IModal<P> = () => {
    const [visible, setVisible] = useState(false)
    const [props, setProps] = useState<P>()

    useEffect(() => {
      const body = document.documentElement || document.body
      Modal.show = (data) => {
        setProps(data)
        setTimeout(() => setVisible(true), 10)
        const bodyTop = body.scrollTop
        body.style.position = 'fixed'
        body.style.top = `-${bodyTop}px`
      }
      Modal.hide = () => {
        setVisible(false)
        const bodyTop = +body.style.top.slice(0, -2)
        body.style.position = ''
        body.style.top = ''
        body.scrollTop = -bodyTop
      }
    }, [])

    return props
      ? createPortal(
          <div
            className={`mask ${visible ? 'show' : 'hide'}`}
            onClick={Modal.hide}
            onTransitionEnd={() => !visible && setProps(undefined)}
          >
            <div className="content" onClick={(e) => e.stopPropagation()}>
              <Content {...props} />
            </div>
          </div>,
          document.body
        )
      : null
  }

  Modal.show = () => {
    throw new Error(`Modal尚未挂载`)
  }

  Modal.hide = () => {
    throw new Error(`Modal尚未挂载`)
  }

  return Modal
}
