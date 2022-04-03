import { useEffect, useState, createContext } from "react";
import useTodoAPI from "../hooks/useTodoAPI";

type UserState = {
  userId: number;
  username: string;
} | null;

export const userStateContext = createContext<UserState>(null);

export default function UserStateProvider(props: any) {
  const [user, setUser] = useState<UserState>(null);
  const { getUser } = useTodoAPI();

  useEffect(() => {
    getUser().then(({ data }) => {
      setUser({ userId: data.user_id, username: data.username });
    });
    // eslint-disable-next-line
  }, []);

  return (
    <userStateContext.Provider value={user}>
      {props.children}
    </userStateContext.Provider>
  );
}
