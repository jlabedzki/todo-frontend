import { useContext, useState } from "react";
import { userStateContext } from "./providers/UserStateProvider";

export default function Login() {
  const { login } = useContext(userStateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = async () => {
    if (!username) {
      setErrorMessage("Username cannot be blank.");
      return;
    }

    if (!password) {
      setErrorMessage("Password cannot be blank.");
      return;
    }

    try {
      await login({ username, password });
    } catch (err: any) {
      if (err.message.includes("404")) {
        setErrorMessage("Invalid Username");
      }
      if (err.message.includes("401")) {
        setErrorMessage("Invalid Password");
      }
    }

    return;
  };

  return (
    <>
      {errorMessage !== "" && <div>{errorMessage}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="username"
          name="username"
          type="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
        ></input>
        <input
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
        ></input>
        <button onClick={validate}>Login</button>
      </form>
    </>
  );
}
