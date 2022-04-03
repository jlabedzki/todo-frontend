import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import useTodoAPI from "../hooks/useTodoAPI";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../assets/authentication.scss";

export default function Authenticate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [needToRegister, setNeedToRegister] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    error: false,
  });
  const { login, register } = useTodoAPI();
  const navigate = useNavigate();

  const headerText = needToRegister ? "CREATE AN ACCOUNT" : "SIGN IN";
  const questionText = needToRegister
    ? "Already have an account? "
    : "Don't have an account? ";

  const validate = async () => {
    if (!username) {
      setMessage({ message: "Username cannot be blank.", error: true });
      return;
    }

    if (!password) {
      setMessage({ message: "Password cannot be blank.", error: true });
      return;
    }

    if (needToRegister) {
      try {
        await register({ username, password });
        setNeedToRegister(false);
        setMessage({
          message: "Account successfully created, please sign in.",
          error: false,
        });
      } catch (err: any) {
        if (err.message.includes("409")) {
          setMessage({ message: "Username already exists.", error: true });
        }
      }

      return;
    }

    try {
      await login({ username, password });
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      if (err.message.includes("404")) {
        setMessage({ message: "Invalid username.", error: true });
      }
      if (err.message.includes("401")) {
        setMessage({ message: "Invalid password.", error: true });
      }
    }

    return;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-header">{headerText}</div>
      <div className={message.error ? "error-message" : "success-message"}>
        {message.message}
      </div>
      {["username", "password"].map((field, index) => {
        return (
          <TextField
            key={index}
            margin="normal"
            variant="filled"
            placeholder={field === "username" ? "Username" : "Password"}
            name={field}
            type={
              field === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : field
            }
            value={field === "username" ? username : password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {field === "username" ? (
                    <PersonOutlineIcon />
                  ) : (
                    <KeyOutlinedIcon />
                  )}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {field === "password" && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              field === "username"
                ? setUsername(e.target.value)
                : setPassword(e.target.value);
              setMessage((prev) => ({ ...prev, message: "" }));
            }}
          />
        );
      })}
      <Button id="submit" onClick={validate} variant="contained" size="large">
        Submit
      </Button>
      <div className="form-footer">
        {questionText}
        <Button onClick={() => setNeedToRegister(!needToRegister)}>
          Click here.
        </Button>
      </div>
    </form>
  );
}
