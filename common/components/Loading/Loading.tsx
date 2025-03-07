import './Loading.scoped.css'
import type { CSSProperties } from 'react'

type Props = { style?: CSSProperties }

export default function Loading({ style }: Props) {
  return (
    <div className="container" style={style}>
      <div
        className="loading"
        style={{ borderColor: style?.color || 'gray' }}
      />
    </div>
  )
}
