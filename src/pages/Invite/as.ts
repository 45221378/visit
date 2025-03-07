// 基础物料属性
export type CidInfo = {
  num: number
  money: number | string
  cid: string | number
  name: string
  price: string // 价格（单位：中东区为金钻，其他区为钻石）
  image: string
  period: string // 有效期，精确到天
  period_hour: string // 有效期，精确到小时
  type: string // 枚举值：经验值（exp）,箱子（box),钥匙(key),头像框(header),爵位(title),礼物(gift),守护(defend),电台守护(radio-defend),优惠券(coupon),坐骑(mounts),碎片(piece),体验券(experience_voucher),聊天气泡(bubble),ring(戒指),effect(特效),decorate(主页装扮),union_box(联盟箱子),union_header(联盟头像框),marry_ring(婚戒),疯狂转盘抽奖券(lottery_coupon),助力卡(music_card),飞行盲盒(mystery_box)
  type_name: string
  expire_day?: number
  is_exclusive_gift?: number // 是否专属礼物
  reward_type?: number
  money_type?: string
  duction_money?: string
  diamond_after_discount?: number
  diamond?: number
  discount?: number
}

export type giftDataAs = {
  name: string
  received_times: number
  gifts: CidInfo[]
  rewards: CidInfo[]
}
