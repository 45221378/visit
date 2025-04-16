import './BirthIn.scoped.scss'
import './../Birthday.scss'
import { useEffect, useState } from 'react'
import Awards from '../Awards/Awards'
import { homeAs } from '../as'
import Loading from '/common/components/Loading/Loading'
import Modal from '/common/components/Modal/Modal'
import MainPop from '../Components/MainPop/MainPop'
import { homeApi, rcvBirthdayRewardkApi } from '../api'
import Task from '../Task/Task'
import { FilterAreaTimeString } from '/src/utils'
import Toast from '/common/components/Toast/Toast'
import ola from '/src/ola'

const BirthIn = () => {
  const [homeInfo, setHomeInfo] = useState<homeAs>()
  const [loding, setLoding] = useState(false)

  const getHomeFun = () => {
    homeApi().then((res) => {
      setHomeInfo(res.data)
      if (res.data.birthday.length === 0 && !localStorage.getItem('birthday')) {
        localStorage.setItem('birthday', '1')
        Modal.show({
          children: <MainPop type="inputBirth" updateFun={getHomeFun} />,
          sendclass: 'birth-modal',
          onClose: () => {
            Modal.hide()
          }
        })
      }
    })
  }

  useEffect(() => {
    getHomeFun()
  }, [])

  if (homeInfo === undefined) return <Loading />

  return (
    <div className="birth-in">
      {homeInfo.birthday.length > 0 ? (
        <div className="race">
          <div className="titlezuo">您的生日是</div>
          <p className="days">{FilterAreaTimeString(homeInfo.birthday, 2)}</p>
          <p className="p3">pati祝你生日快乐, 以下是送你的生日礼物</p>
        </div>
      ) : (
        <div className="race">
          <div className="titlezuo">您的生日是</div>
          <button
            className="inputbirth"
            onClick={() => {
              Modal.show({
                children: <MainPop type="inputBirth" updateFun={getHomeFun} />,
                sendclass: 'birth-modal',
                onClose: () => {
                  Modal.hide()
                }
              })
            }}
          >
            填写生日
          </button>
        </div>
      )}
      <div className="get-gifts">
        {homeInfo.birthday_reward.map((item, index) => (
          <Awards cidInfo={item} key={index} />
        ))}
      </div>
      <button
        className={`${
          (!homeInfo.is_me_birthday_month || homeInfo.has_rcv_reward) &&
          'gifts-btn-dis'
        } gifts-btn`}
        type="button"
        onClick={() => {
          // if (loding) return
          if (+ola.user.uid === 900058798) {
            Toast.show('loading')
          }
          if (homeInfo.is_me_birthday_month) {
            if (!homeInfo.has_rcv_reward) {
              setLoding(true)
              rcvBirthdayRewardkApi()
                .then(() => {
                  setLoding(false)
                  Toast.show('您的生日礼物已发放，请到背包中使用')
                  getHomeFun()
                })
                .catch(() => {
                  setLoding(false)
                })
            } else {
              if (+ola.user.uid === 900058798) {
                Toast.show('geted')
              }
            }
          } else {
            Toast.show('暂未到达生日礼物领取时间')
          }
        }}
      >
        领取生日奖励
      </button>
      <p className="lessd">
        {/* {'贵族等级大于{num1}级用户，可领取{num2}天生日奖励'
          .replace('{num1}', '3')
          .replace('{num2}', '7')} */}
        {homeInfo.birthday_reward_tips}
      </p>
      <Task homeInfo={homeInfo} getHomeFun={getHomeFun} />
    </div>
  )
}
export default BirthIn
