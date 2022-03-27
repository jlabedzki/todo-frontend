export interface UserState {
  userId: number | null;
  username: string | null;
}

export interface UserData {
  state: UserState | null;
  login: Function;
  register: Function;
}

export interface User {
  username: string;
  password: string;
}

export interface ReducerAction {
  type: string;
  value: UserState;
}

export interface Reducers {
  [key: string]: Function;
}
