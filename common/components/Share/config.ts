import {
  shareFacebook,
  shareLine,
  shareQQ,
  shareQZone,
  shareTwitter,
  shareWechat,
  shareWechatMoment
} from '/common/native'
import imgFacebook from './images/facebook.png'
import imgTwitter from './images/twitter.png'
import imgLine from './images/line.png'
import imgWechat from './images/wechat.svg'
import imgQQ from './images/qq.svg'
import imgMoment from './images/moment.svg'
import imgQzone from './images/qzone.svg'

export default [
  {
    name: 'facebook',
    type: 'facebook',
    icon: imgFacebook,
    share: shareFacebook,
    region: 'oversea'
  },
  {
    name: 'twitter',
    type: 'twitter',
    icon: imgTwitter,
    share: shareTwitter,
    region: 'oversea'
  },
  {
    name: 'line',
    type: 'line',
    icon: imgLine,
    share: shareLine,
    region: 'oversea'
  },
  {
    name: `微信`,
    type: 'wechat',
    icon: imgWechat,
    share: shareWechat,
    region: 'mainland'
  },
  {
    name: 'QQ',
    type: 'qq',
    icon: imgQQ,
    share: shareQQ,
    region: 'mainland'
  },
  {
    name: `朋友圈`,
    type: 'moment',
    icon: imgMoment,
    share: shareWechatMoment,
    region: 'mainland'
  },
  {
    name: `QQ空间`,
    type: 'qzone',
    icon: imgQzone,
    share: shareQZone,
    region: 'mainland'
  }
]
