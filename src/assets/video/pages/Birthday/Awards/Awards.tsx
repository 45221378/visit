import './Awards.scoped.scss'
import { FC, MouseEvent, useState } from 'react'
import { filterImg, getCidTimingOnly } from '/src/utils'
import { CidInfo } from '../as'
function isTextOverflown(element: HTMLDivElement) {
  return element.scrollWidth > element.offsetWidth
}

const filterName = (item: CidInfo) => {
  // if (item.type === 'lottery') return '抽卡券'
  // if (item.type === 'custom_badge') return '定制勋章'
  // if (item.type === 'custom_header') return '头像框'
  // if (item.type === 'liang') return '靓号'
  // if (item.type === 'custom_screen') return '开屏页'
  return item.name
}
const Awards: FC<{
  cidInfo: CidInfo
  sendClass?: string
  timingsty?: number
  showprobability?: boolean
}> = ({ cidInfo, sendClass, timingsty = 1, showprobability }) => {
  const [timing, setTiming] = useState(0)
  const transFunc = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const curTrans: HTMLDivElement | null =
      e.currentTarget.querySelector('.award-name-trans')
    const floatItem: HTMLDivElement | null =
      e.currentTarget.querySelector('.float-item')

    if (!curTrans || curTrans.className.includes('award-ani')) return
    const ele = document.querySelector('.award-name-trans.award-ani')
    ele?.classList.remove('award-ani', 'nodot')
    if (
      curTrans &&
      floatItem &&
      isTextOverflown(curTrans) &&
      curTrans.textContent
    ) {
      const deepCopy = floatItem.cloneNode(true)
      setTiming(curTrans.textContent.length / 2)
      deepCopy && curTrans.appendChild(deepCopy)
      curTrans.classList.add('award-ani', 'nodot')
    }
  }

  return (
    <div className={`awards ${sendClass}`}>
      <div className="gift-main flex-center">
        <img
          className="gift"
          src={filterImg(cidInfo.image)}
          alt={cidInfo.name}
        />
        {showprobability && cidInfo.probability && (
          <p className="probability">{cidInfo.probability}%</p>
        )}
        {timingsty === 2 &&
          ((cidInfo.money_type === 'coin' && cidInfo.type === 'gift') ||
          cidInfo.type === 'coin' ? (
            <p className="timing-coin sty2">{cidInfo.price}</p>
          ) : cidInfo.type === 'money_b' ? (
            <p className="price sty2">{cidInfo?.price}</p>
          ) : getCidTimingOnly(cidInfo) !== '' ? (
            <p className="timeinfo sty2">{getCidTimingOnly(cidInfo)}</p>
          ) : (
            +cidInfo.price > 0 && <p className="price sty2">{cidInfo?.price}</p>
          ))}
      </div>
      {/* 如果是金豆礼物，则显示价格+数量，单独的标签，因为要带金豆图标 */}
      {/* 如果是没有价格的礼物，则有效期+数量 */}
      {/* 如果是有价格的礼物，则价格+数量，单独的标签，因为要可能要带钻石图标，这个项目封装了翻译分案，暂时不处理 */}
      <div
        className="awards-name"
        onClick={(e) => {
          transFunc(e)
        }}
      >
        <div className="award-floating">
          <div
            className="award-name-trans"
            style={{
              animationDuration: `${timing}s`
            }}
          >
            <div className="float-item">{filterName(cidInfo)}</div>
          </div>
        </div>
      </div>
      {timingsty === 1 &&
        ((cidInfo.money_type === 'coin' && cidInfo.type === 'gift') ||
        cidInfo.type === 'coin' ? (
          <p className="timing-coin">{cidInfo.price}</p>
        ) : cidInfo.type === 'money_b' ? (
          <p className="price">{cidInfo?.price}</p>
        ) : getCidTimingOnly(cidInfo) !== '' ? (
          <p className="timeinfo">
            {getCidTimingOnly(cidInfo)}
            {cidInfo.num > 1 ? '*' + cidInfo?.num : ''}
          </p>
        ) : (
          +cidInfo.price > 0 && (
            <p className="price">
              {cidInfo?.price}
              {cidInfo.num > 1 ? '*' + cidInfo?.num : ''}
            </p>
          )
        ))}
    </div>
  )
}

export default Awards
