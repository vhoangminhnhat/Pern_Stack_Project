import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AppContextModel } from "./model/AppContextModel";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(undefined);
  const [isAuthen, setIsAuthen] = useState<boolean>(false);

  const onLogout = useCallback(() => {
    localStorage.clear();
    setToken(undefined);
    navigate("/sign-in");
    setIsAuthen(false);
  }, [navigate]);

  return (
    <AppContext.Provider
      value={{
        isAuthen,
        token,
        setToken,
        setIsAuthen,
        onLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContextConfig = (): AppContextModel =>
  useContext(AppContext) as AppContextModel;
