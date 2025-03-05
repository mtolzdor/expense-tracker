import axios from "axios";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

type AuthContext = {
  user: User | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type User = {
  userName: string;
  email: string;
};

const url = "http://localhost:5294/api/";

const UserContext = createContext<AuthContext>({} as AuthContext);

export const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      //implement token exp check
      /*
      const tokenDate = JSON.parse(atob(token.split(".")[1]));
      console.log(tokenDate.exp);
      if (tokenDate.exp > new Date().getTime()) {
        //logout();
    
      }
      */
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(url + "account/register/", {
        email: email,
        username: username,
        password: password,
      });
      const data = response.data;
      if (data) {
        localStorage.setItem("token", data.token);

        const userObj = { userName: data.userName, email: data.email };
        localStorage.setItem("user", JSON.stringify(userObj));

        setToken(data.token!);
        setUser(userObj!);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(url + "account/login/", {
        username: username,
        password: password,
      });
      const data = response.data;
      if (data) {
        localStorage.setItem("token", data.token);

        const userObj = { userName: data.userName, email: data.email };
        localStorage.setItem("user", JSON.stringify(userObj));

        setToken(data.token!);
        setUser(userObj!);
        navigate("/expenses");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{ login, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
