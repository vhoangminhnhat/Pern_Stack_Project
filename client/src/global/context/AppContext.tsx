import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AppContextModel } from "./model/AppContextModel";
import SidebarRepository from "api/repositories/sidebar/SidebarRepository";
import { SidebarMenuConfigModel } from "api/repositories/sidebar/model/SidebarConfigModel";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>(undefined);
  const [isAuthen, setIsAuthen] = useState<boolean>(false);
  const [config, setConfig] = useState<SidebarMenuConfigModel>();

  const getAppConfig = async () => {
    try {
      let appConfig = await SidebarRepository.getSidebarMenu();
      if (appConfig) {
        setConfig(appConfig.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthen === true) {
      getAppConfig();
    }
  }, []);

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
        onLogout,
        config
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContextConfig = (): AppContextModel =>
  useContext(AppContext) as AppContextModel;
