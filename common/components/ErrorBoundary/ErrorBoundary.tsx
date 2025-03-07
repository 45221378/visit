import './ErrorBoundary.scoped.css'
import { Component, ReactNode } from 'react'
import imgError3 from './error2.svg'

export default class ErrorBoundary extends Component<{
  env?: object
  children: ReactNode
}> {
  state: { errorMessage: null | string } = {
    errorMessage: null
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.message }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error, errorInfo)
  }

  render() {
    const { errorMessage } = this.state
    const { children, env } = this.props

    if (errorMessage) {
      return (
        <div className="page">
          <img src={imgError3} alt="" />
          <span>Something went wrong!</span>
          <button
            type="button"
            className="refresh"
            onClick={() => {
              window.location.href = `${import.meta.env.BASE_URL}${
                window.location.search ? '&' : '?'
              }newDate=${new Date().getTime()}`
            }}
          >
            返回首页
          </button>
          <p>{decodeURIComponent(errorMessage)}</p>
          {env && (
            <div className="env">
              {Object.keys(env).map((keyItem) => {
                return (
                  <div key={keyItem}>
                    <i> {keyItem}</i>:
                    <strong> {`${env[keyItem as keyof typeof env]}`}</strong>
                  </div>
                )
              })}
              <div>
                <i>href</i>:<strong>{window.location.href}</strong>
              </div>
            </div>
          )}
        </div>
      )
    }
    return children
  }
}
