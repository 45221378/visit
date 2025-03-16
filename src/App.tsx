import Router from './Router'
import ErrorBoundary from '/common/components/ErrorBoundary/ErrorBoundary'
import Toast from '/common/components/Toast/Toast'
import Modal from '/common/components/Modal/Modal'
import { GlobalContextProvider } from './context/globalContext'
import ola from './ola'

const env = {
  lan: ola.user.lan,
  uid: ola.user.uid,
  appName: ola.app.config.appName,
  server_env: ola.app.server_env
}

export default function App() {
  return (
    <ErrorBoundary env={env}>
      <Toast />
      <Modal />
      <GlobalContextProvider>
        <Router />
      </GlobalContextProvider>
    </ErrorBoundary>
  )
}
