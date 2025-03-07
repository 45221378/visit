import './Share.scoped.css'
import { createPortal } from 'react-dom'
import { type FC, useEffect, useRef, useState } from 'react'
import Toast from '../Toast/Toast'
import shareList from './config'

interface IShare extends FC<{ region: 'mainland' | 'oversea' }> {
  show: (tp: number) => Promise<{ type: string; tp: number }> | void
}

const Share: IShare = ({ region = 'mainland' }) => {
  const [tp, setTP] = useState<number>()
  const confirmRef = useRef<(options: { type: string; tp: number }) => void>()

  useEffect(() => {
    Share.show = (tp) => {
      setTP(tp)
      return new Promise((resolve) => {
        confirmRef.current = resolve
      })
    }
  })

  async function share(shareItem: (typeof shareList)[number]) {
    if (!tp) return Toast.show(`未设置tp参数`)
    await shareItem.share(tp)
    if (confirmRef.current) confirmRef.current({ type: shareItem.type, tp })
    setTP(undefined)
  }

  const list = shareList.filter((item) => item.region === region)

  return createPortal(
    <>
      <div className={`share ${tp ? 'show' : 'hide'}`}>
        {list.map((item) => {
          return (
            <button
              type="button"
              className="item"
              onClick={() => share(item)}
              key={item.type}
            >
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </button>
          )
        })}
      </div>
      <div
        className={`mask ${tp ? 'show' : 'hide'}`}
        onClick={() => setTP(undefined)}
      />
    </>,
    document.body
  )
}

Share.show = () => {
  throw new Error(`Share尚未挂载`)
}

export default Share
