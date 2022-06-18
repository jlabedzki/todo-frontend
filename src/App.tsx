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

function App() {
  const [cookies] = useCookies();

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            cookies.access_token ? (
              <Navigate to="dashboard" />
            ) : (
              <Navigate to="login" />
            )
          }
        /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Authenticate />} /> */}
        <Route path="/profile" element={<p>Your profile</p>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
