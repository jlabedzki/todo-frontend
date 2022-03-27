export interface UserState {
  userId: number | null;
  username: string | null;
}

export interface UserData {
  state: UserState | null;
  login: Function;
}

export interface User {
  username: string;
  password: string;
}

export interface ReducerAction {
  type: string;
  value: object;
}

export interface Reducers {
  [key: string]: Function;
}
