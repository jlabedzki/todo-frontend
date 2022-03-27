import { createContext, useReducer } from "react";
import axios from "axios";
import userDataReducer, { SET_USER_DATA } from "../../reducers/userDataReducer";
import { UserData, User } from "../../types";

export const userStateContext = createContext<UserData>({
  state: null,
  login: () => {},
  register: () => {},
});

export default function UserStateProvider(props: any) {
  const [state, dispatch] = useReducer(userDataReducer, {
    userId: null,
    username: null,
  });

  const login = async (user: User) => {
    try {
      const { data } = await axios.post("/login", user);
      dispatch({
        type: SET_USER_DATA,
        value: {
          ...state,
          userId: data.user_id,
          username: data.username,
        },
      });
      localStorage.setItem("user_id", data.user_id);
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

  const userData = {
    state,
    login,
    register,
  };

  return (
    <userStateContext.Provider value={userData}>
      {props.children}
    </userStateContext.Provider>
  );
}
