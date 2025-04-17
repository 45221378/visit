import { useGlobalContext } from "../context/globalContext"
import zh_cn from "./zh_cn.json"
import en from "./en.json"
declare global {
  interface Window {
    locale: Record<string, string>
  }
}

// 按顺序尝试加载多语言,返回第一个加载成功的语言, 如果全部加载失败,不做多语言处理,返回汉语
export default async function setLocaleInit(
  ...languages: string[]
) {
  const lans = [...new Set(languages)]
  for (let i = 0; i < lans.length; i += 1) {
    const lan = lans[i]
    try {
      // eslint-disable-next-line no-await-in-loop
      if (lan === 'zh_cn') {
        window.locale = zh_cn
      } else {
        window.locale = en
      }
      // const module = await import(`/src/locale/${lan}.json`)
      // window.locale = module.default
      console.log(`./${lan}.json加载成功`)
      return lan
    } catch (err) {
      console.log(`./${lan}.json加载失败`, err)
    }
  }
  return 'zh_cn'
}