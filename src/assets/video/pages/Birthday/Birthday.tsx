import './Birthday.scss'
import { useEffect, useRef, useState } from 'react'
import ola from '/src/ola'
import setLocale from '/src/locale'
import Loading from '/common/components/Loading/Loading'
import BirthIn from './BirthIn/BirthIn'
import Lottery from './Lottery/Lottery'
import { CardOne } from './Components/Card/Card'
import Modal from '/common/components/Modal/Modal'
import MainPop, { Rule } from './Components/MainPop/MainPop'
import Rank from './Rank/Rank'
import Party from './Party/Party'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { eventParticipateApi } from './api'
import { act_id } from './instance'
const BirthdayGifts = () => {
  const [rightTab, setRightTab] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef1 = useRef<HTMLDivElement>(null)
  const textRef2 = useRef<HTMLDivElement>(null)
  const textRef3 = useRef<HTMLDivElement>(null)
  const textRef4 = useRef<HTMLDivElement>(null)
  // 如果需要在某个时刻检查溢出情况，可以在其他地方调用此函数
  const checkOverflow = (textElement: HTMLElement | null) => {
    textRef1.current?.classList.remove('anin')
    textRef2.current?.classList.remove('anin')
    textRef3.current?.classList.remove('anin')
    textRef4.current?.classList.remove('anin')
    if (
      wrapperRef.current &&
      textElement &&
      textElement.scrollWidth > wrapperRef.current.offsetWidth
    ) {
      console.log(textElement.scrollWidth, wrapperRef.current.offsetWidth)
      textElement.classList.add('anin')
    }
  }

  return (
    <div className="day-task">
      {/* <div
        className="dot"
        onClick={() => {
          Modal.show({
            children: <MainPop type="rule" />,
            sendclass: 'birth-modal',
            onClose: () => {
              Modal.hide()
            }
          })
        }}
      ></div> */}

      <NavLink className="dot" to="../rule"></NavLink>
      <p className="nooo">敬请期待</p>
      <div className="nav-tabs">
        <div
          className={`${rightTab === 1 && 'active'} nav-tab nav-tab1`}
          onClick={() => {
            setRightTab(1)
            checkOverflow(textRef1.current)
          }}
        >
          <div className="scrolling-text-container" ref={wrapperRef}>
            <div className="scrolling-text" ref={textRef1}>
              生日礼物
            </div>
          </div>
        </div>
        <div
          className={`${rightTab === 2 && 'active'} nav-tab nav-tab2`}
          onClick={() => {
            setRightTab(2)
            checkOverflow(textRef2.current)
          }}
        >
          <div className="scrolling-text-container" ref={wrapperRef}>
            <div className="scrolling-text" ref={textRef2}>
              充值抽奖
            </div>
          </div>
        </div>
        <div
          className={`${rightTab === 3 && 'active'} nav-tab nav-tab3`}
          onClick={() => {
            setRightTab(3)
            checkOverflow(textRef3.current)
          }}
        >
          <div className="scrolling-text-container" ref={wrapperRef}>
            <div className="scrolling-text" ref={textRef3}>
              生日榜单
            </div>
          </div>
        </div>
        <div
          className={`${rightTab === 4 && 'active'} nav-tab nav-tab4`}
          onClick={() => {
            setRightTab(4)
            checkOverflow(textRef4.current)
          }}
        >
          <div className="scrolling-text-container" ref={wrapperRef}>
            <div className="scrolling-text" ref={textRef4}>
              生日派对
            </div>
          </div>
        </div>
      </div>
      {rightTab === 1 ? (
        <CardOne>
          <BirthIn />
        </CardOne>
      ) : rightTab === 2 ? (
        <Lottery />
      ) : rightTab === 3 ? (
        <Rank />
      ) : rightTab === 4 ? (
        <Party />
      ) : null}
    </div>
  )
}

let count = 1
document.addEventListener(
  'click',
  (e) => {
    if (e && e.target) {
      const target = e.target as HTMLElement
      if (
        typeof target.onclick === 'function' ||
        target.getAttribute('data-tea')
      ) {
        count++
        if (count > 2) return
        eventParticipateApi({ act_id: act_id })
        window.ta.track('event_participate', {
          uid: ola.user.uid,
          id: act_id
        })
      }
    }
  },
  true
)
const Birthday = () => {
  const [landata, setLandata] = useState(false)

  useEffect(() => {
    const root = document.getElementById('root') as HTMLElement
    setLocale('birthday', ola.user.area, ola.user.lan, 'en').then((lan) => {
      if (lan) root.classList.add(lan)
      setLandata(true)
    })
  }, [])

  return (
    <div className="birthday">
      {landata ? (
        <Routes>
          <Route path="/" element={<Navigate to="Birthdaygift" replace />} />
          <Route path="/birthdaygift" element={<BirthdayGifts />} />
          <Route path="/rule" element={<Rule />} />
        </Routes>
      ) : (
        <CardOne>
          <Loading />
        </CardOne>
      )}
    </div>
  )
}

export default Birthday
