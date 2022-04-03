import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface User {
  username: string;
  password: string;
}

interface Todo {
  id?: number;
  title: string;
  date: Date;
  priority?: number;
  completed?: boolean;
}

export default function useTodoAPI() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${cookies.access_token}`,
    },
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 422) {
        navigate("/login", { replace: true });
        throw new Error("Failed to authenticate request");
      }

      console.log({ error });
      throw new Error("Failed to fetch data from API");
    }
  );

  const perform = async (method: Method, resource: string, data?: object) => {
    return await client({
      method: method,
      url: resource,
      data: data,
    });
  };

  //Authentication routes
  const register = async (user: User) => {
    return perform("post", "/register", user);
  };

  const login = async (user: User) => {
    const { data } = await perform("post", "/login", user);
    setCookie("access_token", data.access_token, {
      path: "/",
    });
    return;
  };

  const logout = async () => {
    await perform("get", "/logout");
    removeCookie("access_token");
    return;
  };

  const getUser = () => {
    return perform("get", "/user");
  };

  //Data routes
  const getTodos = (userId: number) => {
    return perform("get", `/todos/${userId}`);
  };

  const postTodo = (userId: number, todo: Todo) => {
    return perform("post", `/todos/${userId}`, todo);
  };

  const patchTodo = (todo: Todo) => {};

  return {
    register,
    login,
    logout,
    getUser,
    getTodos,
    postTodo,
  };
}
