import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useContext, useState } from "react";
import { userStateContext } from "../providers/UserStateProvider";
import "./authentication.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Authenticate() {
  const { login, register } = useContext(userStateContext);
  const [needToRegister, setNeedToRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const headerText = needToRegister ? "CREATE AN ACCOUNT" : "SIGN IN";
  const questionText = needToRegister
    ? "Already have an account? "
    : "Don't have an account? ";

  const validate = async () => {
    if (!username) {
      setErrorMessage("Username cannot be blank.");
      return;
    }

    if (!password) {
      setErrorMessage("Password cannot be blank.");
      return;
    }

    if (needToRegister) {
      try {
        await register({ username, password });
      } catch (err: any) {
        if (err.message.includes("409")) {
          setErrorMessage("Username already exists.");
        }
      }
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

  const textFields = ["username", "password"].map((field, index) => {
    return (
      <TextField
        key={index}
        margin="normal"
        variant="filled"
        placeholder={field === "username" ? "Username" : "Password"}
        name={field}
        type={
          field === "password" ? (showPassword ? "text" : "password") : field
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
          setErrorMessage("");
        }}
      />
    );
  });

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-header">{headerText}</div>
      {successMessage ? (
        <div className="success-message">{successMessage}</div>
      ) : (
        <div className="error-message">{errorMessage}</div>
      )}
      {textFields}
      <Button id="submit" onClick={validate} variant="contained" size="large">
        Submit
      </Button>
      <div className="form-footer">
        {questionText}
        <a id="register" onClick={() => setNeedToRegister(!needToRegister)}>
          Click here.
        </a>
      </div>
    </form>
  );
}
