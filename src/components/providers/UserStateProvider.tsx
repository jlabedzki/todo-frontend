import { ContextType, createContext, useReducer } from "react";
import axios from "axios";
import userDataReducer, { SET_USER_DATA } from "../../hooks/userDataReducer";
import { Context } from "vm";

export const stateContext = createContext<Context>({
  value: Object,
});

export default function UserStateProvider(props: any) {
  const [state, dispatch] = useReducer(userDataReducer, {
    userId: null,
    username: "",
  });

  const login = (username: string, password: string) => {
    axios.post("/login", { username, password }).then(({ data }) => {
      return dispatch({
        type: SET_USER_DATA,
        value: {
          ...state,
          userId: data.user_id,
          username: data.username,
        },
      });
    });
  };

  const userData = {
    state,
    login,
  };

  return (
    <stateContext.Provider value={userData}>
      {props.children}
    </stateContext.Provider>
  );
}
