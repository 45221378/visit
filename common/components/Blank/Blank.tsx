import './Blank.scoped.css'
import type { CSSProperties, ReactNode } from 'react'
import Nodata from '/src/assets/init/nodata.png'

type Props = { style?: CSSProperties; sendClass?: string; children?: ReactNode }

export default function BlankRank({ style, sendClass, children }: Props) {
  return (
    <div className={`container ${sendClass}`} style={style}>
      <img src={Nodata} alt="" className="nodata-img" />
      {children && <div className="children">{children}</div>}
    </div>
  )
}
