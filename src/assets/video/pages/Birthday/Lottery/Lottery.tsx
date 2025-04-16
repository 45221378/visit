import { useEffect, useMemo, useRef, useState } from 'react'
import './Lottery.scoped.scss'
import './../Birthday.scss'
import { CidInfo, lotteryHomeAs, lotteryListAs } from '../as'
import Modal from '/common/components/Modal/Modal'
import Toast from '/common/components/Toast/Toast'
import { lotteryApi, lotteryHomeApi, lotteryListApi } from '../api'
import Broadcast from '../Broadcast/Broadcast'
import { CardOne, CardTwo } from '../Components/Card/Card'
import Awards from '../Awards/Awards'
import { filterImg, FilterAreaTimeDate, getCidTimingOnly } from '/src/utils'
import MainPop from '../Components/MainPop/MainPop'
import Loading from '/common/components/Loading/Loading'
import BlankRank from '/common/components/Blank/Blank'
import { showChargeBalance } from '/common/native'

const Lottery = () => {
  const [loding, setLoding] = useState(false)
  const [lotteryData, setLotteryData] = useState<lotteryHomeAs>()
  const [resultListData, setResultListData] = useState<lotteryListAs['list']>()
  const [lastid, setLastid] = useState('')
  const [done, setDone] = useState(false)

  const activespeend = useRef<number>(0) // 起始位置
  const timeRef = useRef<number>()
  const speed = useRef(210)
  const quickRollTimes = useRef(0)
  const resultIndex = useRef(0)
  const maxQuickRollTimes = 5
  const maxSpeed = 210
  const minSpeed = 40
  const finalResult = useRef<CidInfo[]>()
  const [rollStep, setRollStep] = useState(-1)

  const compluteWidth = useMemo(() => {
    if (!lotteryData) return 0
    const score = lotteryData.my_recharge
    // const score = 0000
    // 分个进度，分别是 1-10%  2-24%  3-38%  4-56% 5-72% 6-100%, 要进坨坨里面去，比css要大
    // const lineStag = [9, 32, 53, 75, 100]
    const lineStag = [8, 25, 43, 62, 78, 100]
    const rightStag = lotteryData.ticket.filter((item) => item.target >= score)
    if (rightStag.length === 0) return 100
    console.log(rightStag)
    const rightIndex = lotteryData.ticket.length - rightStag.length // 计算出所在区间的索引,然后加上前面的进度值
    // console.log(score)
    // console.log(homeData.score_info.score_config[0].score)

    // 第一个区间
    if (rightIndex === 0)
      return (score / lotteryData.ticket[0].target) * lineStag[0]
    // 大于第一个区间
    const lastscore = score - lotteryData.ticket[rightIndex - 1].target
    const adb =
      lotteryData.ticket[rightIndex].target -
      lotteryData.ticket[rightIndex - 1].target
    const alerdyPress = lineStag[rightIndex - 1]
    const lastPress = lineStag[rightIndex] - lineStag[rightIndex - 1]
    const result = (lastscore / adb) * lastPress + alerdyPress
    return result
  }, [lotteryData])

  const getLotteryFun = () => {
    lotteryHomeApi().then((res) => {
      setLotteryData(res.data)
    })
  }

  const getResultListFun = (minid: string) => {
    lotteryListApi(minid).then((res) => {
      if (minid === '0') {
        setResultListData(res.data.list)
      } else {
        setResultListData(resultListData?.concat(res.data.list))
      }
      setDone(res.data.list.length < res.data.limit)
      if (res.data.list.length > 0) {
        setLastid(res.data.list[res.data.list.length - 1].id)
      }
    })
  }

  const FindIndex = (resultsend: CidInfo[]) => {
    if (lotteryData) {
      lotteryData.reward.forEach((item, index) => {
        if (
          Number(item.cid) === Number(resultsend[resultsend.length - 1].cid) &&
          Number(item.num) === Number(resultsend[resultsend.length - 1].num)
        ) {
          resultIndex.current = index
        }
      })
    }
  }

  const hadleRollSpeed = () => {
    if (!lotteryData) return
    activespeend.current =
      (activespeend.current + 1) % lotteryData.reward.length
    setRollStep(activespeend.current)

    if (
      quickRollTimes.current < maxQuickRollTimes &&
      speed.current > minSpeed
    ) {
      speed.current -= 30
    } else {
      speed.current += 40
      if (
        speed.current > maxSpeed &&
        activespeend.current === resultIndex.current
      ) {
        clearTimeout(timeRef.current)
        setLoding(false)
        activespeend.current = resultIndex.current - 1
        speed.current = 210
        quickRollTimes.current = 0
        if (finalResult.current && finalResult.current.length > 0) {
          Modal.show({
            children: (
              <MainPop type="lottery" resultList={finalResult.current} />
            ),
            onClose: () => {
              Modal.hide()
            }
          })
        }
        return
      }
    }
    if (speed.current <= minSpeed) {
      quickRollTimes.current++
    }
    timeRef.current = setTimeout(() => hadleRollSpeed(), speed.current)
  }

  const handleLottery = () => {
    if (loding || !lotteryData) return
    if (lotteryData.lottery_times <= 0) {
      Toast.show('抽奖券不足')
      return
    }
    if (lotteryData) {
      setLoding(true)
      lotteryApi()
        .then((res) => {
          if (res.success) {
            FindIndex(res.data.rewards)
            finalResult.current = res.data.rewards
            hadleRollSpeed()
            getLotteryFun()
            getResultListFun('0')
          }
        })
        .catch(() => {
          setLoding(false)
        })
    }
  }

  useEffect(() => {
    getLotteryFun()
    getResultListFun('0')
  }, [])

  if (lotteryData === undefined)
    return (
      <CardOne>
        <Loading />
      </CardOne>
    )

  return (
    <CardOne>
      <div className="race1">
        <div className="titlezuo">寿星专属福利</div>
        <p className="p4">
          当月寿星用户，充值达到目标即可获得生日福利抽奖，海量礼物、道具等你来抽，最高还有大额钻石哦，赶快去充值赢大奖吧！
        </p>
      </div>
      <div className="lottery">
        {lotteryData.scrollbar.length > 0 && (
          <Broadcast info={lotteryData.scrollbar} />
        )}
        <div className="lottery-wrap">
          <div className="disk">
            {lotteryData.reward &&
              lotteryData.reward.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index === rollStep ? 'disk-active' : ''
                    } disk-item${index + 1} disk-item`}
                  >
                    <Awards cidInfo={item} timingsty={2} />
                  </div>
                )
              })}
            <button
              type="button"
              className={`btn-lottery ${
                loding || +lotteryData.lottery_times === 0 ? 'lottery-dis' : ''
              }`}
              onClick={() => {
                handleLottery()
              }}
            >
              抽奖
            </button>
          </div>
        </div>
        <br />
        <CardTwo title="获得抽奖券">
          <div className="pp-pink">
            {'我的抽奖券：{num}张'.replace(
              '{num}',
              `${lotteryData.lottery_times}`
            )}
          </div>
          <div className="couples">
            {lotteryData.ticket.map((item, index) => (
              <div className={`couple${index + 1} couple`} key={index}>
                <div className="stage-card">+{item.ticket}</div>
                <div className="i"></div>
                <div className="stage-num">💎{item.target}</div>
              </div>
            ))}
            <div className="contain-move">
              <div
                className="move-precent"
                style={{ left: compluteWidth - 100 + '%' }}
              ></div>
            </div>
          </div>
          <button
            className="gifts-btn"
            type="button"
            onClick={() => {
              showChargeBalance()
            }}
          >
            去充值
          </button>
          <div className="my-ad">
            {'我已充值：💎{num}'.replace('{num}', `${lotteryData.my_recharge}`)}
          </div>
        </CardTwo>
        <br />
        <CardTwo title="我获得的奖励">
          {resultListData ? (
            resultListData.length === 0 ? (
              <BlankRank style={{ width: '50vw' }} />
            ) : (
              resultListData.map((item, index) => (
                <div key={index} className="cc-item">
                  {item.rewards.map((it, id) => (
                    <div key={id} className="cc-item">
                      <div className="contain-img">
                        <img src={filterImg(it.image)} alt="" />
                      </div>
                      <div className="right-info">
                        <p className="cc-name">
                          {it.name}
                          {it.type === 'money_b'
                            ? `*${it.price}`
                            : `*${getCidTimingOnly(it)}${
                                it.num > 1 ? `*${it.num}` : ''
                              }`}
                        </p>
                        <p className="cc-time">
                          {FilterAreaTimeDate(+item.created_time * 1000, true)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )
          ) : (
            <Loading />
          )}
          {!done && (
            <div
              className="next"
              onClick={() => {
                getResultListFun(lastid)
              }}
            >
              下一页
            </div>
          )}
        </CardTwo>
      </div>
    </CardOne>
  )
}

export default Lottery
