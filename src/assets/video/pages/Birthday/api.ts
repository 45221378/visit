import {
  CidInfo,
  homeAs,
  lotteryHomeAs,
  lotteryListAs,
  monthRankAs,
  ruleAs,
  weekPartyAs,
  weekRankAs
} from './as'
import createOlaAxios from './instance'
import ola from '/src/ola'

const { request } = createOlaAxios(ola)
export function eventParticipateApi(data: { act_id: string }) {
  return request(
    {
      method: 'post',
      url: '/_activity/common/eventParticipate',
      data
    },
    true
  )
}

export function homeApi() {
  return request<{
    data: homeAs
  }>({
    method: 'get',
    url: '/_activity/birthday/home'
  })
}

// 生日登记
export function regApi(birthday: string) {
  return request<{
    data: null
  }>({
    method: 'post',
    url: '/_activity/birthday/reg',
    data: {
      birthday
    }
  })
}

// 领生日奖励
export function rcvBirthdayRewardkApi() {
  return request<{
    data: null
  }>({
    method: 'post',
    url: '/_activity/birthday/rcvBirthdayReward'
  })
}

// 领取任务奖励
export function rcvTaskRewardApi(type: number) {
  return request<{
    data: null
  }>({
    method: 'post',
    url: '/_activity/birthday/rcvTaskReward',
    data: {
      type
    }
  })
}

// 抽奖
export function lotteryApi() {
  return request<{
    data: {
      rewards: CidInfo[]
    }
  }>({
    method: 'post',
    url: '/_activity/birthday/lottery'
  })
}

// 抽奖奖池
export function lotteryHomeApi() {
  return request<{
    data: lotteryHomeAs
  }>({
    method: 'get',
    url: '/_activity/birthday/lotteryHome'
  })
}

// 我获得的奖励记录
export function lotteryListApi(min_id: string) {
  return request<{
    data: lotteryListAs
  }>({
    method: 'get',
    url: '/_activity/birthday/lotteryList',
    params: {
      min_id
    }
  })
}

// 周榜
export function weekRankApi(week?: string) {
  return request<{
    data: weekRankAs
  }>({
    method: 'get',
    url: '/_activity/birthday/weekRank',
    params: {
      week
    }
  })
}

// 月榜
export function monthRankApi(month?: string) {
  return request<{
    data: monthRankAs
  }>({
    method: 'get',
    url: '/_activity/birthday/monthRank',
    params: {
      month
    }
  })
}

// 周生日派对
export function weekPartyApi() {
  return request<{
    data: {
      list: weekPartyAs[]
    }
  }>({
    method: 'get',
    url: '/_activity/birthday/weekParty'
  })
}

// 预约
export function resvApi(id: string) {
  return request<{
    data: null
  }>({
    method: 'post',
    url: '/_activity/birthday/resv',
    data: {
      id
    }
  })
}

// 规则
export function ruleApi() {
  return request<{
    data: ruleAs
  }>({
    method: 'get',
    url: '/_activity/birthday/rule'
  })
}
