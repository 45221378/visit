import { FC, useEffect, useState } from 'react'
import { CardOne, CardTwo } from '../Components/Card/Card'
import './Rank.scoped.scss'
import BlankRank from '/common/components/Blank/Blank'
import Loading from '/common/components/Loading/Loading'
import { CommonText } from '/src/utils/lan'
import { monthRankAs, RankAs, weekRankAs } from '../as'
import ola from '/src/ola'
import User from '../Components/User/User'
import { monthRankApi, weekRankApi } from '../api'
import { FilterAreaTimeString } from '/src/utils'
const RecordResult: FC<{ record: RankAs; isSelf?: boolean }> = ({
  record,
  isSelf
}) => {
  return (
    <div
      className={`list-body ${isSelf && 'user-self'} ${
        record.rank < 4 ? `rank${record.rank}` : 'rankn'
      }`}
    >
      <div className="rank">{record.rank < 4 ? '' : record.rank}</div>
      <User icon={record.icon} rid={+record.online_rid} uid={+record.uid} />
      <div className="name-info">
        <p className="name">{record.name}</p>
        <p className="uid">uid: {record.uid}</p>
      </div>
      <div className="score">
        <p className="score-p"> {record.score}</p>
        <p className="p2">积分</p>
      </div>
    </div>
  )
}
const Rank = () => {
  const area = ola.user.area as keyof typeof CommonText
  const [rightTab, setRightTab] = useState(1)
  const [recordList, setrecordList] = useState<RankAs[]>()
  const [userSelf, setUserSelf] = useState<RankAs>()
  const [rankWeekNavs, setRankWeekNavs] = useState<weekRankAs['weeks']>()
  const [rankMonthNavs, setRankMonthNavs] = useState<monthRankAs['months']>()

  const getRankWeek = async (week?: string) => {
    setrecordList(undefined)
    const { data } = await weekRankApi(week)
    setrecordList(data.ranks)
    setUserSelf(data.user)
    setRankWeekNavs(data.weeks)
  }

  const getRankMonth = async (month?: string) => {
    setrecordList(undefined)
    const { data } = await monthRankApi(month)
    setrecordList(data.ranks)
    setUserSelf(data.user)
    setRankMonthNavs(data.months)
  }

  useEffect(() => {
    if (rightTab === 1) {
      getRankWeek()
    }
    if (rightTab === 2) {
      getRankMonth()
    }
  }, [rightTab])

  return (
    <CardOne pad="marginb30">
      <div className="heightline"></div>
      <CardTwo title2="开盲盒赢钻石" pad="pad1">
        <div
          className="pp2"
          dangerouslySetInnerHTML={{
            __html:
              '送出生日盲盒可获得{name}，并累计榜单积分，TOP3将获得榜单奖励，一起参与吧！'.replace(
                '{name}',
                `<span class="purple">${'高价值礼物'}</span>`
              )
          }}
        ></div>
      </CardTwo>
      <div className="rank-navs">
        <div
          className={`rank-nav ${rightTab === 1 && 'active'}`}
          onClick={() => {
            setRightTab(1)
          }}
        >
          周榜
        </div>
        <div
          className={`rank-nav ${rightTab === 2 && 'active'}`}
          onClick={() => {
            setRightTab(2)
          }}
        >
          月榜
        </div>
      </div>
      {rankWeekNavs && rightTab === 1 && (
        <div
          className={`${rankWeekNavs.length < 5 && 'nav-center'} twice-navs`}
        >
          {rankWeekNavs.map((item, index) => {
            return (
              <div
                className={`twice-nav ${item.is_active && 'active'}`}
                key={index}
                onClick={() => {
                  getRankWeek(item.week)
                }}
              >
                {FilterAreaTimeString(item.start_date, 3)}
                <span>-</span>
                {FilterAreaTimeString(item.end_date, 3)}
              </div>
            )
          })}
        </div>
      )}

      {rankMonthNavs && rightTab === 2 && (
        <div
          className={`${rankMonthNavs.length < 5 && 'nav-center'} twice-navs`}
        >
          {rankMonthNavs.map((item, index) => {
            return (
              <div
                className={`twice-nav ${item.is_active && 'active'}`}
                key={index}
                onClick={() => {
                  getRankMonth(item.month)
                }}
              >
                {FilterAreaTimeString(item.start_date, 3)}
                <span>-</span>
                {FilterAreaTimeString(item.end_date, 3)}
              </div>
            )
          })}
        </div>
      )}
      {recordList === undefined && <Loading />}
      {recordList?.length === 0 && (
        <div className="arrange">
          <BlankRank sendClass="normalimg">
            <p className="no-p">{CommonText[area][0]}</p>
          </BlankRank>
        </div>
      )}
      <div className="list-content">
        {recordList &&
          recordList.length > 0 &&
          recordList.map((record, index) => (
            <RecordResult record={record} key={index} />
          ))}
      </div>
      {userSelf && userSelf && <RecordResult record={userSelf} isSelf />}
    </CardOne>
  )
}

export default Rank
