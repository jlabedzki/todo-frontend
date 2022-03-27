import "./assets/App.scss";
import { useContext } from "react";
import { userStateContext } from "./components/providers/UserStateProvider";
import Login from "./components/authentication/Login";

function App() {
  const { state } = useContext(userStateContext);

  return <>{!state?.userId ? <Login></Login> : <div>hello world</div>}</>;
}

export default App;
