import './Task.scoped.scss'
import './../Birthday.scss'
import { homeAs, tasksVirgoAs } from '../as'
import { CardTwo } from '../Components/Card/Card'
import ola from '/src/ola'
import { rcvTaskRewardApi } from '../api'
import { goRoomGame, openRoomAndGift, showChargeBalance } from '/common/native'
import Toast from '/common/components/Toast/Toast'
import { filterImg } from '/src/utils'

type Props = { homeInfo: homeAs; getHomeFun: () => void }

const Task = ({ homeInfo, getHomeFun }: Props) => {
  const filterBtnClass = (item: tasksVirgoAs) => {
    // 1-未开启,2-去完成,3-领奖励,4-已完成
    if (+item.status === 1) return ['geted', '未开启']
    if (+item.status === 2) return ['geting', '去完成']
    if (+item.status === 3) return ['', '领奖励']
    if (+item.status === 4) return ['geted', '已完成']
    return ['', '']
  }

  const redeemFun = (item: tasksVirgoAs) => {
    if (+item.status === 3) {
      rcvTaskRewardApi(item.type).then((res) => {
        if (res) {
          getHomeFun()
          Toast.show('您的生日礼物已发放，请到背包中使用')
        }
      })
    }
    if (+item.status === 2) {
      if (item.type === 1 || item.type === 3) {
        showChargeBalance()
      }
      if (item.type === 2 && item.rid) {
        openRoomAndGift(item.rid)
      }
      if (item.type === 4 && item.rid) {
        goRoomGame(item.rid)
      }
    }
  }

  return (
    <CardTwo title="更多奖励">
      <div className="task">
        <div className="pp-pink">完成以下任务领取额外奖励</div>
        <div className="task-ul">
          {homeInfo &&
            homeInfo.task.length > 0 &&
            homeInfo.task.map((item) => (
              <div className="task-li" key={item.type}>
                <div className="left-des">
                  <div className="die1">
                    {item.type === 1
                      ? '完成本月首次充值'
                      : item.type === 2
                      ? '完成本月首次送礼'
                      : item.type === 3
                      ? '累计充值{num}钻石'.replace('{num}', `${item.target}`)
                      : item.type === 4
                      ? ola.user.area === 'en'
                        ? 'slot投注{num}钻石'.replace('{num}', `${item.target}`)
                        : 'Greedy投注{num}钻石'.replace(
                            '{num}',
                            `${item.target}`
                          )
                      : null}
                    {(item.type === 3 || item.type === 4) && (
                      <span>
                        （<span className="orange">{item.cur_val}</span>/
                        {item.target}）
                      </span>
                    )}
                  </div>
                  <div className="show-imgs">
                    {item.rewards.map((it, id) => (
                      <img src={filterImg(it.image)} alt="" key={id} />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className={`get ${filterBtnClass(item)[0]}`}
                  onClick={() => {
                    redeemFun(item)
                  }}
                >
                  {filterBtnClass(item)[1]}
                </button>
              </div>
            ))}
        </div>
      </div>
    </CardTwo>
  )
}

export default Task
