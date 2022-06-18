import UserDropdownMenu from "../components/UserDropdownMenu";
import PomodoroDropdownMenu from "../components/PomodoroDropdownMenu";
import useTodoAPI from "../hooks/useTodoAPI";
import { useEffect, useState } from "react";

interface Todo {
  id?: number;
  title: string;
  date: Date;
  priority?: number;
  completed?: boolean;
}

type UserState = {
  userId: number;
  username: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserState | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { getUser, getTodos } = useTodoAPI();

  useEffect(() => {
    getUser()
      .then(({ data }) => {
        console.log({ data });
        setUser({ userId: data.user_id, username: data.username });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    getTodos(user.userId).then(({ data }) => setTodos(data));
  }, [user]);

  return (
    <div className="d-flex flex-column w-100 mt-4">
      <div className="text-light d-flex justify-content-between">
        <PomodoroDropdownMenu />
        <h2>Get It Done</h2>
        <UserDropdownMenu />
      </div>
      <div>
        {todos.map((todo, index) => {
          return <p key={index}>{todo.title}</p>;
        })}
      </div>
    </div>
  );
}
