import './Navigation.scoped.css'
import { ReactNode, useEffect, useState } from 'react'
import { navigateBack, getSystemInfoSync } from '/common/native'

function useStatusBarHeight() {
  const [statusBarHeight, setStatusBarHeight] = useState(0)

  useEffect(() => {
    getSystemInfoSync().then((result: any) => {
      setStatusBarHeight(result.statusBarHeight)
    })
  }, [])

  return statusBarHeight
}

function useScrollTop() {
  const [top, setTop] = useState(0)

  useEffect(() => {
    const scrollHandler = () =>
      setTop(Math.round(document.documentElement.scrollTop))
    window.document.addEventListener('scroll', scrollHandler)
    return () => window.document.removeEventListener('scroll', scrollHandler)
  }, [])

  return top
}

type Props = {
  distance?: number // 透明到不透明的距离
  color?: string
  backgroundColor?: string
  more?: boolean
  children?: ReactNode
  onClickMore?: () => void
}

export default function Navigation(props: Props) {
  const {
    distance = 0,
    color = 'white',
    backgroundColor = 'transparent',
    more = false,
    children,
    onClickMore
  } = props
  const statusBarHeight = useStatusBarHeight()
  const scrollTop = useScrollTop()

  const style = {
    backgroundColor,
    color,
    padding: `calc(${statusBarHeight}px + 3vw) 0 3vw 0`,
    opacity: distance === 0 ? 1 : Math.min(scrollTop, distance) / distance
  }

  return (
    <>
      <div className="navigation" style={style}>
        <span className="title">{children}</span>
      </div>
      <div className="back" style={{ padding: style.padding }}>
        <svg
          onClick={() => {
            navigateBack().catch(() => window.history.back())
          }}
          viewBox="0 0 1024 1024"
          color="#ffffff"
        >
          <path
            fill={color}
            d="M769.405 977.483c-27.074 27.568-71.045 27.568-98.121 0l-416.591-423.804c-27.173-27.568-27.173-72.231 0-99.899l416.492-423.804c13.537-13.734 31.324-20.652 49.109-20.652s35.572 6.917 49.109 20.652c27.173 27.568 27.173 72.331 0 99.899l-367.482 373.806 367.482 373.904c27.074 27.568 27.074 72.231 0 99.899z"
          />
        </svg>
      </div>
      {more && (
        <div
          className="more"
          style={{ padding: style.padding }}
          onClick={onClickMore}
        >
          <svg viewBox="0 0 1036 1024">
            <path
              fill={color}
              d="M816.123532 520.014534c0 56.349379 45.693692 102.024651 102.017488 102.024651 56.33403 0 102.027721-45.675272 102.027721-102.024651 0-56.33403-45.693692-102.009302-102.027721-102.009302C861.817224 418.004209 816.123532 463.680505 816.123532 520.014534zM408.066883 520.014534c0 56.349379 45.670156 102.024651 101.991905 102.024651 56.346309 0 102.043071-45.675272 102.043071-102.024651 0-56.33403-45.695738-102.009302-102.043071-102.009302C453.737038 418.004209 408.066883 463.680505 408.066883 520.014534zM0 520.014534c0 56.349379 45.670156 102.024651 102.004185 102.024651 56.346309 0 102.029768-45.675272 102.029768-102.024651 0-56.33403-45.683459-102.009302-102.029768-102.009302C45.670156 418.004209 0 463.680505 0 520.014534z"
            />
          </svg>
        </div>
      )}
    </>
  )
}
