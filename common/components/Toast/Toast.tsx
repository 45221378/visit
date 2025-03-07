import './Toast.scoped.css'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'

interface IToast extends FC {
  show: (message: string, duration?: number, sendClass?: string) => void
  loading: (message?: string) => void
  hide: () => void
}

const Toast: IToast = () => {
  const [visibleToast, setVisibleToast] = useState(false)
  const [messageToast, setMessageToast] = useState('')
  const [visibleLoading, setVisibleLoading] = useState(false)
  const [messageLoading, setMessageLoading] = useState<string | undefined>()
  const [sendClass, setSendClass] = useState('')

  Toast.show = (message, duration = 1500, sendClass = '') => {
    setMessageToast('')
    setVisibleToast(true)
    setMessageToast(message)
    setSendClass(sendClass)
    setTimeout(() => {
      setVisibleToast(false)
    }, duration)
  }
  Toast.loading = (message) => {
    setVisibleLoading(true)
    setMessageLoading(message)
  }
  Toast.hide = () => setVisibleLoading(false)

  return createPortal(
    <>
      <div className={`mask ${visibleToast ? 'show' : 'hide'} ${sendClass}`}>
        <div className="box">
          <div className="toast-message">{messageToast}</div>
        </div>
      </div>
      <div className={`mask ${visibleLoading ? 'show' : 'hide'}`}>
        <div className="box">
          <svg viewBox="0 0 1024 1024">
            <path
              d="M512 981.312a469.312 469.312 0 1 0-445.824-322.24A42.688 42.688 0 1 0 147.2 632.32 384 384 0 1 1 512 896a42.688 42.688 0 1 0 0 85.312z"
              fill="#ffffff"
            />
          </svg>
          <div className="loading-message">{messageLoading}</div>
        </div>
      </div>
    </>,
    document.body
  )
}

Toast.show = () => console.log(`Toast尚未挂载`)
Toast.hide = () => console.log(`Toast尚未挂载`)
Toast.loading = () => console.log(`Toast尚未挂载`)

export default Toast
