export interface UserState {
  userId: number;
  username: string;
}

export interface ReducerAction {
  type: string;
  value: object;
}

export interface Reducers {
  [key: string]: Function;
}
