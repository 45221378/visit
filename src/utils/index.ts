import ola from '../ola'
import { useState, useCallback, useEffect } from 'react'
import { checkWebpFeature, leftPad } from '@ola/utils'
export function getAvatar(iconPath: string, head150 = true) {
  const oss = ola.app.config.oss
  if (head150) return `${oss}/${iconPath}!head150`
  return `${oss}/${iconPath}`
}

export function getTimeDate(stamp: number, nozero?: boolean) {
  const time = new Date(+stamp)
  const year = time.getFullYear()
  const month = nozero
    ? time.getMonth() + 1
    : time.getMonth() + 1 < 10
    ? `0${time.getMonth() + 1}`
    : time.getMonth() + 1
  const date = nozero
    ? time.getDate()
    : time.getDate() < 10
    ? `0${time.getDate()}`
    : time.getDate()
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
  const minute =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  return [year, month, date, hour, minute]
}

// 是否支持webp
export const useImgType = () => {
  const [usewebpFlag, setWbpFlag] = useState<boolean>(true)
  const webpFlag = useCallback(async () => {
    return setWbpFlag(await checkWebpFeature())
  }, [])

  useEffect(() => {
    webpFlag()
  }, [webpFlag])

  return { usewebpFlag }
}

export const FilterRank = (rank: number | string) => {
  if (rank === '99+') return '99+'
  if (+rank < 1) return '99+'
  if (+rank > 0 && +rank < 3) return ''
  if (+rank > 3) return rank
}

export function formatTime(timeStr: string | number) {
  const temp = +timeStr * 1000
  const yy = new Date(temp).getFullYear()
  const mm = leftPad(new Date(temp).getMonth() + 1)
  const date = leftPad(new Date(temp).getDate())
  const hh = leftPad(new Date(temp).getHours())
  const fen = leftPad(new Date(temp).getMinutes())
  return `${yy}/${mm}/${date} ${hh}:${fen}`
}

export const filterImg = (imgUrl?: string) => {
  if (!imgUrl) return ''
  if (imgUrl.includes('webp')) {
    return `${ola.app.config.oss}/${imgUrl}`
  }
  return `${ola.app.config.oss}/${imgUrl}?x-oss-process=image/resize,p_50`
}

// 节流
let throttleMark = true
export function throttle(timing: number) {
  return new Promise((res) => {
    if (throttleMark) {
      throttleMark = false
      setTimeout(() => {
        throttleMark = true
      }, timing)
      res('')
    }
  })
}

// 防抖
let debounceTimer: any
export function debounce(timing: number) {
  return new Promise((res) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      res('')
    }, timing)
  })
}
