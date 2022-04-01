import { useCookies } from "react-cookie";
import axios from "axios";
import { UserState } from "../components/providers/UserStateProvider";
import { AuthenticationError, BackendError } from "../errors";

type Method = "get" | "post" | "put" | "patch" | "delete";

export default function useTodoAPI(user: UserState) {
  const [cookies] = useCookies();
  const id = user.userId;

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
        //TODO: implement redirect to login page, need to get react-router setup
        throw new AuthenticationError();
      }
      throw new BackendError("Could not fetch data");
    }
  );

  const perform = async (method: Method, resource: string, data?: object) => {
    return await client({
      method: method,
      url: resource,
      data: data,
    });
  };

  const getTodos = () => {
    return perform("get", `/todos/${id}`);
  };

  return {
    getTodos,
  };
}
