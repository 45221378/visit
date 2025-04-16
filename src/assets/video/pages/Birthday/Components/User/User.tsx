import './User.scoped.scss'
import { type FC } from 'react'
import ola from '/src/ola'
import imgAvatar from '/src/assets/init/avatar.png'
import { openRoom, showFloatImageMini } from '/common/native'

const User: FC<{
  sendclass?: string
  icon?: string
  rid?: number
  uid?: number
  ridNum?: number
}> = ({ sendclass, icon, rid, uid, ridNum }) => {
  function onAvatarClick() {
    if (rid) return openRoom(rid)
    if (uid && uid > 0) return showFloatImageMini(uid)
  }

  return (
    <div className={`${sendclass} user`}>
      <div className="avatar" onClick={onAvatarClick}>
        <img
          src={icon ? `${ola.app.config.oss}/${icon}!head150` : imgAvatar}
          alt={icon}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = imgAvatar
          }}
        />
        {Number(rid) > 0 ? <div className="live" /> : null}
      </div>
    </div>
  )
}

export default User
