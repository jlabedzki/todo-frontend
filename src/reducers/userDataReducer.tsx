import { UserState, ReducerAction, Reducers } from "../types";

export const SET_USER_DATA = "SET_USER_DATA";

export default function userDataReducer(
  state: UserState,
  action: ReducerAction
) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
}

const setUserData = (state: UserState, action: ReducerAction) => {
  return {
    ...state,
    userId: action.value.userId,
    username: action.value.username,
  };
};

const reducers: Reducers = {
  SET_USER_DATA: setUserData,
};
