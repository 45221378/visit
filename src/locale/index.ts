import axios from 'axios'
import { QS } from '@ola/utils'
import ola from '../ola'
const base = import.meta.env.BASE_URL
const actName = base.split('/')[2]

declare global {
  interface Window {
    locale: Record<string, string>
  }
}

const isMock = window.location.href.includes('localhost')
const jumpLan = window.location.href.includes('jumpLan')

// 按顺序尝试挂载翻译,返回第一个挂载成功的语言, 如果全部挂载失败,不做多语言处理
// 多语言翻译工具目录：h5/upload-lans
export default async function setLocale(...languages: string[]) {
  if (isMock) return ola.user.area
  if (jumpLan) return 'en'
  const lans = [...new Set(languages)]
  for (let i = 0; i < lans.length; i += 1) {
    const lan = lans[i]
    try {
      // eslint-disable-next-line no-await-in-loop
      const { data } = await axios.post(
        `/_activity/upload/${
          ola.app.server_env === 'development'
            ? 'translateJsonDetailInner'
            : 'translateJsonDetail'
        }`,
        {
          act_name: actName,
          language: lan
        },
        {
          baseURL:
            ola.app.server_env === 'development'
              ? 'https://api.pati.chat'
              : ola.app.config.baseURL[ola.app.server_env],
          headers: { 'user-token': ola.user.token },
          transformRequest: [
            (data) =>
              !data || data instanceof FormData ? data : QS.stringify(data)
          ]
        }
      )
      if (data.data === '{}') throw Error()
      window.locale = JSON.parse(data.data)
      return lan
    } catch (err) {
      console.log(`./locale/${lan}.json加载失败`, err)
    }
  }
}
