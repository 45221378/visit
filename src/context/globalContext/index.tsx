// 公共状态, 业务组件中引入useGlobalContext即可使用其中的状态

import { createContext, useContext, type ReactNode } from 'react'

import useAudioCtx from './audioCtx'
import useLocale from './useLocal'
const useGlobalData = () => ({
  ...useAudioCtx(),
  ...useLocale()
})

const GlobalContext = createContext<ReturnType<typeof useGlobalData>>({} as any)

type Props = { children: ReactNode }
function GlobalContextProvider({ children }: Props) {
  const globalData = useGlobalData()
  return (
    <GlobalContext.Provider value={globalData}>
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => useContext(GlobalContext)

export { GlobalContextProvider, useGlobalContext }
