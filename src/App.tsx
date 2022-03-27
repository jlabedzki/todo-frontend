import "./assets/App.css";
import { useContext } from "react";
import { userStateContext } from "./components/providers/UserStateProvider";
import Login from "./components/Login";

function App() {
  const { state } = useContext(userStateContext);

  return <>{!state?.userId ? <Login></Login> : <div>hello world</div>}</>;
}

export default App;
