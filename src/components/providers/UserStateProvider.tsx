import { createContext, useReducer } from "react";
import axios from "axios";
import userDataReducer, { SET_USER_DATA } from "../../hooks/userDataReducer";
import { UserData, User } from "../../types";

export const userStateContext = createContext<UserData>({
  state: null,
  login: () => {},
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
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const userData = {
    state,
    login,
  };

  return (
    <userStateContext.Provider value={userData}>
      {props.children}
    </userStateContext.Provider>
  );
}
