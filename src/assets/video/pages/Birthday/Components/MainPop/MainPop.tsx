import { FC, useEffect, useState } from 'react'
import { CidInfo, ruleAs } from '../../as'
import InputBirth from './InputBirth'
import './MainPop.scoped.scss'
import Modal from '/common/components/Modal/Modal'
import Awards from '../../Awards/Awards'
import ola from '/src/ola'
import { CardOne, CardTwo } from '../Card/Card'
import { ruleApi } from '../../api'
import Loading from '/common/components/Loading/Loading'

type Props = { type?: string; resultList?: CidInfo[]; updateFun?: () => void }

export const LotteryResult: FC<{ award?: CidInfo[] }> = ({ award }) => {
  return (
    <div className="lottery-result">
      <p className="title">恭喜获得</p>
      {award &&
        award.map((item, index) => <Awards cidInfo={item} key={index} />)}
      <button
        className="sure"
        onClick={() => {
          Modal.hide()
        }}
      >
        知道了
      </button>
    </div>
  )
}

export const timing = {
  en: '09/04/2025 21:00 (UTC-4)',
  ko: '',
  ja: '',
  th: '09/04/2025 12:00 (UTC+9)',
  id: '09/04/2025 12:00 (UTC+7)',
  vi: '09/04/2025 12:00 (UTC+7)'
}[ola.user.area]

export const Rule: FC = () => {
  const [ruleData, setRuleData] = useState<ruleAs>()
  const getRuleData = () => {
    ruleApi().then((res) => {
      if (res) {
        setRuleData(res.data)
      }
    })
  }

  useEffect(() => {
    getRuleData()
  }, [])

  return (
    <div className="page-rule">
      <CardOne title="活动规则">
        <div className="page-rule-content">
          <div className="chapter ">一、活动时间</div>
          <div className="pp mgtb1">{timing}</div>
          <div className="chapter">二、活动规则</div>
          <div className="pp">
            1、用户填写生日后，将在生日所在月份的1号开启专属生日party活动，可领取全套生日礼物装扮。
          </div>
          <div className="pp">
            2、完成额外充值/送礼/累计充值/游戏投注任务可获得额外生日礼物
          </div>
          <div className="pp">
            3、完成充值任务可获得生日抽奖券，可获得钻石和装扮奖励
          </div>
          <div className="pp">
            {'4、生日周榜/月榜：按照用户赠送【生日party】盲盒，开出礼物价值（{num}钻={num1}积分）计入榜单。周榜top{num2}和月榜top{num3}可获得榜单奖励。'
              .replace('{num}', `${ruleData?.rate_diamond}`)
              .replace('{num1}', `${ruleData?.rate_score}`)
              .replace('{num2}', `${ruleData?.week.limit}`)
              .replace('{num3}', `${ruleData?.month.limit}`)}
          </div>
          <br />
          <div className="chapter">三、活动盲盒</div>
          <CardTwo title="生日party盲盒">
            <div className="gift-content">
              {ruleData === undefined && <Loading />}
              {ruleData &&
                ruleData.blind_box.rewards.map((item, index) => (
                  <Awards
                    key={index}
                    cidInfo={item}
                    sendClass="rule1"
                    showprobability
                  />
                ))}
            </div>
          </CardTwo>
          <br />

          <div className="chapter">四、榜单奖励</div>
          <CardTwo title="生日周榜奖励">
            <div className="show-gift">
              {ruleData &&
                ruleData.week.rewards.map((item, index) => (
                  <div key={index} className="show-award-box">
                    <p className="les">{item.name}</p>
                    <div className="show-award">
                      {item.rewards.map((it, id) => (
                        <Awards key={id} cidInfo={it} sendClass="rule2" />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </CardTwo>
          <br />
          <CardTwo title="生日月榜奖励">
            <div className="show-gift">
              {ruleData &&
                ruleData.month.rewards.map((item, index) => (
                  <div key={index} className="show-award-box">
                    <p className="les">{item.name}</p>
                    <div className="show-award">
                      {item.rewards.map((it, id) => (
                        <Awards key={id} cidInfo={it} sendClass="rule2" />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </CardTwo>
          <br />
          <div className="chapter">五、活动说明</div>
          <div className="pp">
            1、无相关游戏权限的用户无法参与活动中的游戏任务
          </div>
          <div className="pp">
            {'2、本活动仅限18岁以上用户参与，本活动与Apple Inc.无关。'}
          </div>
          <div className="pp">
            3、法律允许范围内，平台享有活动最终解释权，如有疑问可联系在线客服进行咨询
          </div>
        </div>
      </CardOne>
    </div>
  )
}

const MainPop = ({ type, resultList, updateFun }: Props) => {
  return (
    <div className={`${type === 'rule' && 'main-pop-rule'} main-pop`}>
      <div className="main-pop-children">
        {type === 'inputBirth' && <InputBirth updateFun={updateFun} />}
        {type === 'lottery' && <LotteryResult award={resultList} />}
        {type === 'rule' && <Rule />}
      </div>
    </div>
  )
}

export default MainPop
