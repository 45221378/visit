import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import NotFound from '/common/components/404/NotFound'
import Loading from '/common/components/Loading/Loading'
import Invite from './pages/Invite/Invite'
import Login from './pages/Login/Login'
export default function Router() {
  return (
    <Suspense fallback={<Loading style={{ height: '100vh' }} />}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<NotFound />} />
          <Route path="invite" element={<Invite />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
