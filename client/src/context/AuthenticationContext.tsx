import { UserResponseModel } from "api/repositories/user/model/UserResponseModel";
import { defaultUserRespository } from "api/repositories/user/UserRepository";
import {
  Context,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContextModel } from "./model/AuthenticationContextModel";

export const LocalContext: Context<AuthenticationContextModel> = createContext(
  new AuthenticationContextModel()
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponseModel>({});
  const navigate = useNavigate();
  const token = localStorage.getItem("chat-token");

  const getUser = useCallback(async () => {
    try {
      const res = await defaultUserRespository.getProfile();
      if (res) {
        setUser(res?.data);
      }
    } catch (error) {
      console.log(error);
      localStorage?.clear();
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!!token) {
      getUser();
    }
  }, []);

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <LocalContext.Provider
      value={{
        getUser,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};

export const AuthenticationContext = () => useContext(LocalContext);
