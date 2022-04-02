import "./assets/App.scss";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authenticate from "./components/AuthenticationForm";
import Dashboard from "./layout/Dashboard";

function App() {
  const [cookies] = useCookies();
  const isLoggedIn = cookies.accessToken;

  return (
    <Router>
      <Routes>
        <Route path="/login">
          <Authenticate />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/profile">
          <p>Your profile</p>
        </Route>
      </Routes>
    </Router>
    // <>{!cookies.access_token ? <Authenticate></Authenticate> : <Dashboard />}</>
  );
}

export default App;
