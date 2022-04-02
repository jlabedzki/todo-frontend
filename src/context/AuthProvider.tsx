import { createContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

interface UserData {
  login: Function;
  register: Function;
  logout: Function;
}

interface User {
  username: string;
  password: string;
}

export const userStateContext = createContext<UserData>({
  login: () => {},
  register: () => {},
  logout: () => {},
});

export default function UserStateProvider(props: any) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "username",
    "user_id",
  ]);

  const login = async (user: User) => {
    try {
      const { data } = await axios.post("/login", user);
      setCookie("access_token", data.access_token, {
        path: "/",
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const register = async (user: User) => {
    try {
      const { status } = await axios.post("/register", user);
      return status;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/logout", {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      removeCookie("access_token");
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const userData = {
    login,
    register,
    logout,
  };

  return (
    <userStateContext.Provider value={userData}>
      {props.children}
    </userStateContext.Provider>
  );
}
