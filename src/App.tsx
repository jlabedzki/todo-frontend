import "./assets/App.scss";
import { useContext } from "react";
import { userStateContext } from "./components/providers/UserStateProvider";
import Authenticate from "./components/authentication/Authenticate";

function App() {
  const { state } = useContext(userStateContext);

  return (
    <>
      {!state?.userId ? <Authenticate></Authenticate> : <div>hello world</div>}
    </>
  );
}

export default App;
