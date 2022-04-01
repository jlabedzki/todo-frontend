import "./assets/App.scss";
import { useCookies } from "react-cookie";
import Authenticate from "./components/authentication/Login";
import Dashboard from "./views/Dashboard";

function App() {
  const [cookies] = useCookies();

  console.log("cookies", cookies);

  return (
    <>{!cookies.access_token ? <Authenticate></Authenticate> : <Dashboard />}</>
  );
}

export default App;
