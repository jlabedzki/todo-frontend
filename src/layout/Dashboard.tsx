import UserDropdownMenu from "../components/UserDropdownMenu";
import { useEffect, useState } from "react";
import useTodoAPI from "../hooks/useTodoAPI";
import { useCookies } from "react-cookie";
import "../assets/dashboard.scss";

export type UserState = {
  userId: number;
  username: string;
} | null;

export default function Dashboard() {
  const [user, setUser] = useState<UserState>(null);
  const { getUser } = useTodoAPI();

  useEffect(() => {
    getUser().then(({ data }) => {
      console.log("data", data);
      setUser({ userId: data.user_id, username: data.username });
    });
  }, []);

  return (
    <div className="main-content">
      <div className="header">
        <p>Pomodoro</p>
        <h2>Get It Done</h2>
        <div>
          {user?.username}
          <UserDropdownMenu />
        </div>
      </div>
    </div>
  );
}
