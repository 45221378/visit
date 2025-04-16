import './Countdown.scoped.scss'
import { useEffect, useMemo, useState } from 'react'
import { countdown } from '@ola/utils'
import { countDownText } from '/src/utils/lan'
import ola from '/src/ola'

function useRestTime(deadline: Date) {
  const [now, setNow] = useState(Date.now())
  const restTime = deadline.getTime() - now

  useEffect(() => {
    const timer = setTimeout(() => setNow(Date.now()), 1000)
    if (restTime <= 0) clearTimeout(timer)
    return () => clearTimeout(timer)
  }, [restTime])

  return restTime
}

type Props = { leftTime: number; status: number; sendClass?: string }
export default function Countdown(props: Props) {
  const area = ola.user.area as keyof typeof countDownText
  const { leftTime, status, sendClass } = props
  const deadline = useMemo(() => new Date(Date.now() + leftTime), [leftTime])

  const restTime = useRestTime(deadline)
  const parsedTime = countdown(restTime).filter((item) => item.value !== null)

  if (status === -3) return null
  if (status === -2)
    return <div className="finished">{countDownText[area][4]}</div>
  if (status === -1) return <div className="finished">未开始</div>

  return (
    <div className={`container ${sendClass}`}>
      {parsedTime.length && (
        <div className="count-box">
          {sendClass === 'final' && <p className="text-p">倒计时</p>}
          {parsedTime.map((item) => (
            <div className="item" key={item.name}>
              <span className="s1">{item.value}</span>
              {sendClass === 'final' ? (
                <span>
                  {item.name
                    .replace('days', ':')
                    .replace('hours', ':')
                    .replace('minutes', ':')
                    .replace('seconds', '')}
                </span>
              ) : (
                <span>
                  {item.name
                    .replace('days', `${countDownText[area][0]}`)
                    .replace('hours', `${countDownText[area][1]}`)
                    .replace('minutes', `${countDownText[area][2]}`)
                    .replace('seconds', `${countDownText[area][3]}`)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
