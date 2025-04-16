import { scrollbarAs } from '../as'
import './Broadcast.scoped.scss'
import './../Birthday.scss'
import { type FC } from 'react'

const getList = (boardList: scrollbarAs[]) => {
  return boardList.map((item, index) => {
    const key = index + 1
    return (
      <div key={key} className="broadcast-item">
        <div className="broadcast-info">
          <p
            className="info"
            dangerouslySetInnerHTML={{
              __html: '恭喜{name}抽到{gift}'
                .replace(
                  '{name}',
                  `<span class="orange">${item.username}</span>`
                )
                .replace(
                  '{gift}',
                  item.rewards[0].type === 'coin'
                    ? '{num}金豆'.replace(
                        '{num}',
                        `<span class="orange">${
                          item.rewards[0].num || 0
                        }</span>`
                      )
                    : item.rewards[0].type === 'money_b'
                    ? '{num}钻石'.replace(
                        '{num}',
                        `<span class="orange">${
                          item.rewards[0].price || 0
                        }</span>`
                      )
                    : `<span class="orange">${item.rewards[0].name}</span>` ||
                      ''
                )
            }}
          ></p>
        </div>
      </div>
    )
  })
}
const Broadcast: FC<{ info: scrollbarAs[] }> = ({ info }) => {
  return (
    <div className="broadcast">
      {info && info.length > 0 && (
        <div className="broadcast-wrap">
          <div
            className="broadcast-list"
            style={{ animationDuration: `${info.length * 2.5}s` }}
          >
            {getList(info)}
            {getList(info)}
          </div>
        </div>
      )}
    </div>
  )
}

export default Broadcast
