import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useContext, useState } from "react";
import { userStateContext } from "../providers/UserStateProvider";
import "./authentication.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { login } = useContext(userStateContext);
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authenticationText = register ? "Register" : "Login";

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
      <div className="form-header">{authenticationText.toUpperCase()}</div>
      <div className="error-message">{errorMessage}</div>
      {textFields}
      <Button id="submit" onClick={validate} variant="contained" size="large">
        {authenticationText}
      </Button>
      {!register ? (
        <div className="form-footer">
          Don't have an account?{" "}
          <a id="register" onClick={() => setRegister(true)}>
            Click here.
          </a>
        </div>
      ) : (
        <div className="form-footer">
          Already have an account?{" "}
          <a id="register" onClick={() => setRegister(false)}>
            Click here.
          </a>
        </div>
      )}
    </form>
  );
}
