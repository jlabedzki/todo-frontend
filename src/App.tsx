import "./assets/App.scss";
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Authenticate from "./components/AuthenticationForm";
import Dashboard from "./layout/Dashboard";
import UserStateProvider from "./context/UserStateProvider";

function App() {
  const [cookies] = useCookies();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            cookies.access_token ? (
              <Navigate to="dashboard" />
            ) : (
              <Navigate to="login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserStateProvider>
              <Dashboard />
            </UserStateProvider>
          }
        />
        <Route
          path="/login"
          element={
            !cookies.access_token ? (
              <Authenticate />
            ) : (
              <Navigate to="dashboard" />
            )
          }
        />
        <Route path="/profile" element={<p>Your profile</p>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
