import createOlaAxios from '../../common/instance'
import ola from '/src/ola'

const { request } = createOlaAxios(ola)

// pg用户上报接口
export function reportPgApi(pg_uid: string | number) {
  return request<{
    data: {
      invite_code: string
    }
  }>({
    method: 'post',
    url: '/party/index/reportPg',
    data: {
      pg_uid
    }
  })
}
