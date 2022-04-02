import axios from "axios";
import { useCookies } from "react-cookie";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface Todo {
  id?: number;
  title: string;
  date: Date;
  priority?: number;
  completed?: boolean;
}

export default function useTodoAPI(userId?: number) {
  const [cookies] = useCookies();

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
      if (error.response.status === 401) {
        //Todo: redirec to  login
        throw new Error("Failed to authenticate request");
      }
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

  const getUser = () => {
    return perform("get", "/user");
  };

  const getTodos = () => {
    return perform("get", `/todos/${userId}`);
  };

  const postTodo = (todo: Todo) => {
    return perform("post", `/todos/${userId}`, todo);
  };

  const patchTodo = (todo: Todo) => {};

  return {
    getUser,
    getTodos,
    postTodo,
  };
}
