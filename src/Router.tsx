import { BrowserRouter, Routes, Route, Navigate , HashRouter} from "react-router-dom";
import { Suspense } from "react";
import NotFound from "/common/components/404/NotFound";
import Loading from "/common/components/Loading/Loading";
import Invite from "./pages/Invite/Invite";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import './styles/index.scss'
import WelcomePage from "./pages/Welcome/Welcome";
export default function Router() {
  return (
    <Suspense fallback={<Loading style={{ height: "100vh" }} />}>
      {/* basename={import.meta.env.BASE_URL} */}
      <HashRouter >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="invite" element={<Invite />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<HomePage />} />
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
}
