// 基础物料属性
export type CidInfo = {
  num: number
  money?: number | string
  cid: string | number
  name?: string
  price: string | number // 价格（单位：中东区为金钻，其他区为钻石）
  image: string
  image_bg: string
  period: string // 有效期，精确到天
  period_hour: string // 有效期，精确到小时
  type: string // 枚举值：经验值（exp）,箱子（box),钥匙(key),头像框(header),爵位(title),礼物(gift),守护(defend),电台守护(radio-defend),优惠券(coupon),坐骑(mounts),碎片(piece),体验券(experience_voucher),聊天气泡(bubble),ring(戒指),effect(特效),decorate(主页装扮),union_box(联盟箱子),union_header(联盟头像框),marry_ring(婚戒),疯狂转盘抽奖券(lottery_coupon),助力卡(music_card),飞行盲盒(mystery_box)
  type_name: string
  expire_day?: number
  is_exclusive_gift?: number // 是否专属礼物
  reward_type?: number
  money_type?: string
  gift_id?: string | number
  duction_money?: string | number
  label?: string
  is_collect?: boolean
  probability?: number
}

export type infoAs = {
  name: string
  reward: CidInfo
}

export type scoreinfoAs = {
  // min_score: {
  //   [key: number]: number
  // }
  sum_score: number
  can_divide: number
  next_level_need_score: number
  next_level_divide: number
  score_config: {
    score: number
    reward: number
  }[]
}

export type homeAs = {
  birthday: string
  has_rcv_reward: boolean
  is_me_birthday_month: boolean
  birthday_reward_tips: string
  birthday_reward: CidInfo[]
  task: tasksVirgoAs[]
}

export type tasksVirgoAs = {
  type: number
  rewards: CidInfo[]
  status: number
  target: number
  cur_val: number
  rid?: number
}

export type scrollbarAs = {
  rewards: CidInfo[]
  username: string
  uid: string
}

export type lotteryHomeAs = {
  max: number
  lottery_times: number
  my_recharge: number
  scrollbar: scrollbarAs[]
  reward: CidInfo[]
  ticket: {
    target: number
    ticket: number
    status: number
  }[]
}

export type lotteryListAs = {
  limit: number
  list: {
    created_time: string
    id: string
    rewards: CidInfo[]
  }[]
}

// rank
export type RankAs = {
  name: string
  icon: string
  online_rid: string
  uid: string
  rank: number
  score: string
}

export type countdownAs = {
  second: number
  state: number
}

export type weekRankAs = {
  weeks: {
    week: string
    is_active: boolean
    start_date: string
    end_date: string
  }[]
  ranks: RankAs[]
  user: RankAs
}

export type monthRankAs = {
  months: {
    month: string
    is_active: boolean
    start_date: string
    end_date: string
  }[]
  ranks: RankAs[]
  user: RankAs
}

export type weekPartyAs = {
  rid: number
  status: number
  name: string
  start_date: string
  end_date: string
  id: string
}

export type ruleAs = {
  blind_box: { rewards: CidInfo[] }
  coin2score: string
  rate_diamond: string
  rate_score: string
  week: {
    limit: number
    rewards: {
      name: string
      rewards: CidInfo[]
    }[]
  }
  month: {
    limit: number
    rewards: {
      name: string
      rewards: CidInfo[]
    }[]
  }
}
