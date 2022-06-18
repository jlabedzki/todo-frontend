import axios, { AxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type Method = "get" | "post" | "put" | "patch" | "delete";

type Todo = {
  id?: number;
  title: string;
  date: Date;
  priority?: number;
  completed?: boolean;
};

type User = {
  username: string;
  password: string;
};

export default function useTodoAPI() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();

  const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const retryClient = (
    originalRequest: AxiosRequestConfig,
    accessToken: string
  ) => {
    return axios({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: originalRequest.url,
      method: originalRequest.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: originalRequest.data,
    });
  };

  client.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${cookies.access_token}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("original request:", typeof originalRequest);

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const { data } = await refreshToken();
          setCookie("access_token", data.access_token);
          return retryClient(originalRequest, data.access_token);
        } catch (error: any) {
          if (error.response?.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }

      if (error.response.status === 401 && originalRequest._retry) {
        navigate("/login", { replace: true });
        return Promise.reject(error);
      }

      throw new Error("Failed to fetch data from API");
    }
  );

  async function perform(method: Method, resource: string, data?: object) {
    return await client({
      method: method,
      url: resource,
      data: data,
    });
  }

  //Authentication routes
  const login = async (user: User) => {
    try {
      const { data } = await perform("post", "/login", user);
      for (const key in data) {
        setCookie(key as "access_token" | "refresh_token", data[key], {
          path: "/",
        });
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const register = async (user: User) => {
    try {
      const { data } = await perform("post", "/register", user);
      for (const key in data) {
        setCookie(key as "access_token" | "refresh_token", data[key], {
          path: "/",
        });
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  async function getUser() {
    return perform("get", "/user");
  }

  async function refreshToken() {
    return await axios.post(
      "/refresh",
      {},
      {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
          Authorization: `Bearer ${cookies.refresh_token}`,
        },
      }
    );
  }

  const logout = async () => {
    await perform("get", "/logout");
    removeCookie("access_token");
    removeCookie("refresh_token");
    return;
  };

  //Data routes
  const getTodos = async (userId: number) => {
    return perform("get", `/todos/${userId}`);
  };

  const postTodo = (userId: number, todo: Todo) => {
    return perform("post", `/todos/${userId}`, todo);
  };

  // const patchTodo = (todo: Todo) => {};

  return {
    login,
    register,
    getUser,
    refreshToken,
    logout,
    getTodos,
    postTodo,
  };
}
