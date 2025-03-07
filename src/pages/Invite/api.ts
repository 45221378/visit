import { giftDataAs } from './as'
import createOlaAxios from '../../../common/instance'
import ola from '/src/ola'

const { request } = createOlaAxios(ola)

/**
 * 首页接口
 */
export async function homeApi() {
  return request<{
    data: {
      act_ended_time: {
        state: number
        second: number
      }
      gift_packs: giftDataAs[]
    }
  }>({
    method: 'get',
    url: '_activity/gift_discount/home',
    params: {}
  })
}
