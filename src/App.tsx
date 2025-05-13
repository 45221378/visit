import Router from './Router'
import ErrorBoundary from '/common/components/ErrorBoundary/ErrorBoundary'
import Toast from '/common/components/Toast/Toast'
import Modal from '/common/components/Modal/Modal'
import { GlobalContextProvider } from './context/globalContext'
import ola from './ola'
import MyAudio from './pages/Audio/Audio'
import './font.scss'

const env = {
  lan: ola.user.lan,
  uid: ola.user.uid,
  appName: ola.app.config.appName,
  server_env: ola.app.server_env
}

export default function App() {
  //获取当前年份
  const year = new Date().getFullYear()
  return (
    <ErrorBoundary env={env}>
      <Toast />
      <Modal />
      <GlobalContextProvider>
        <MyAudio />
        <Router />
        <div className='bottom-info'>
          <p className='p1'>蒂升电梯(中国)所有@{year}</p>
          <div className='p1'>沪ICP备17004808号-9A</div>
          <p className='p12'><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402009937">沪公网安备 31010402009937号</a></p>
        </div>
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}
