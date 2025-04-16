import './Party.scoped.scss'
import { CardOne, CardTwo } from '../Components/Card/Card'
import { useEffect, useState } from 'react'
import { weekPartyAs } from '../as'
import { resvApi, weekPartyApi } from '../api'
import BlankRank from '/common/components/Blank/Blank'
import { openRoom } from '/common/native'
import Toast from '/common/components/Toast/Toast'
import { FilterAreaTimeString } from '/src/utils'
const Party = () => {
  const [patrydata, setPatrydata] = useState<weekPartyAs[]>()

  const getPartyData = async () => {
    const { data } = await weekPartyApi()
    setPatrydata(data.list)
  }

  const resvFun = (id: string) => {
    resvApi(id).then(() => {
      Toast.show('您已成功预约，派对开启时将收到消息提醒。')
      getPartyData()
    })
  }

  useEffect(() => {
    getPartyData()
  }, [])

  return (
    <CardOne>
      <div className="heightline"></div>
      <CardTwo title2="生日欢乐派对" pad="pad1">
        <div
          className="pp2"
          dangerouslySetInnerHTML={{
            __html:
              'Pati和公会一起为你庆祝生日啦！各公会来举办生日Party，包含{name}等！赶快来参与吧！'.replace(
                '{name}',
                `<span class="purple">${'才艺节目、活动游戏和有奖榜单'}</span>`
              )
          }}
        ></div>
      </CardTwo>

      <div className="party-ul">
        {patrydata && patrydata.length === 0 && (
          <BlankRank sendClass="normalimg">
            <p className="no-p">暂无派对</p>
          </BlankRank>
        )}
        {patrydata &&
          patrydata.length > 0 &&
          patrydata.map((item, index) => (
            <div className="arrange" key={index}>
              <div className="time">
                <p>{FilterAreaTimeString(item.start_date, 3)}</p>
                <p>{FilterAreaTimeString(item.start_date, 5)}</p>
              </div>
              <div className="info">
                <div className="info1">{item.name}</div>
                <div className="info2">房间号：{item.rid}</div>
              </div>
              <div
                className={`${+item.status === 3 && 'right-now-dis'} right-now`}
                onClick={() => {
                  if (+item.status === 3) return
                  if (+item.status === 2 && item.rid) {
                    openRoom(+item.rid)
                  }
                  if (+item.status === 1) {
                    resvFun(item.id)
                  }
                }}
              >
                {+item.status === 1
                  ? '预约'
                  : +item.status === 3
                  ? '已预约'
                  : '去参加'}
              </div>
            </div>
          ))}
      </div>

      <CardTwo pad="pad1" title2="申请举办生日会">
        <div
          className="pp2"
          dangerouslySetInnerHTML={{
            __html:
              'Pati发布每周生日会举办有奖活动申请啦！公会可以联系{name}，需要准备生日会的节目信息，可以是才艺表演、用户互动等玩法，审核通过后将可获得官方提供的扶持奖励！包括房间置顶，虚拟道具、钻石等奖励！还等什么，赶快联系官方报名吧！'.replace(
                '{name}',
                `<span class="purple">${'官方工作人员报名'}</span>`
              )
          }}
        ></div>
      </CardTwo>
    </CardOne>
  )
}

export default Party
