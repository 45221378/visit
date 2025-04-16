import { useCallback, useState } from 'react'
import './MainPop.scoped.scss'
import { ConfigProvider, DatePicker } from 'antd-mobile/2x'
import enUS from 'antd-mobile/es/locales/en-US'
import idID from 'antd-mobile/es/locales/id-ID'
import viVN from 'antd-mobile/es/locales/vi-VN'
import koKR from 'antd-mobile/es/locales/ko-KR'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { FilterAreaTimeString, getTimeDate } from '/src/utils'
import ola from '/src/ola'
import Toast from '/common/components/Toast/Toast'
import Modal from '/common/components/Modal/Modal'
import { regApi } from '../../api'

const deteValue = new Date(1995, 9, 31)
const now = new Date(new Date().getTime())
const oldnow = new Date(new Date().getTime() - 24 * 60 * 60 * 100000 * 365)
const jumpLan =
  window.location.href.includes('zh_tw') ||
  window.location.href.includes('jumplan')

type Props = { updateFun?: () => void }

const InputBirth = ({ updateFun }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sendtime, setSendTime] = useState<string>('')
  const noAnd = ola.user.area === 'id' || ola.user.area === 'en'
  console.log(noAnd)

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'year':
        return `${data}${noAnd ? '' : '年'}`
      case 'month':
        return `${data}${noAnd ? '' : '月'}`
      case 'day':
        return `${data}${noAnd ? '' : '日'}`
      default:
        return data
    }
  }, [])

  const filterArea = (type: string) => {
    switch (type) {
      case 'id':
        return idID
      case 'vi':
        return viVN
      case 'en':
        return enUS
      case 'ko':
        return koKR
      case 'zh_tw':
        return zhCN
      default:
        return enUS
    }
  }

  const sureSign = () => {
    if (sendtime.length === 0) {
      return Toast.show('请选择日期')
    }
    console.log(sendtime)
    regApi(sendtime).then((res) => {
      if (res) {
        Toast.show('您填写的生日已提交成功!')
        updateFun && updateFun()
        setTimeout(() => {
          Modal.hide()
        }, 1500)
      }
    })
  }

  return (
    <div className="inputbirth">
      <div className="title">请确认您的生日</div>
      <div className="input-birth"></div>
      <div
        className="time-p"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        {/* 各个区域页面显示的格式 2/8/2025 */}
        {sendtime.length > 1 ? FilterAreaTimeString(sendtime, 2) : '请选择日期'}
      </div>
      <ConfigProvider
        locale={filterArea(jumpLan ? 'zh_tw' : ola.user.area || 'en')}
      >
        <DatePicker
          visible={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
          precision="day"
          onConfirm={(val: Date) => {
            // sendtime 与后端交互的格式为 20250802
            setSendTime(
              `${getTimeDate(val)[0]}${getTimeDate(val)[1]}${
                getTimeDate(val)[2]
              }`
            )
          }}
          max={now}
          min={oldnow}
          value={deteValue}
          renderLabel={labelRenderer}
        />
      </ConfigProvider>

      <p className="b-tips">确认后不可修改，请谨慎填写</p>
      <button
        type="button"
        className="sure-birth"
        onClick={() => {
          sureSign()
        }}
      >
        确认
      </button>
    </div>
  )
}

export default InputBirth
