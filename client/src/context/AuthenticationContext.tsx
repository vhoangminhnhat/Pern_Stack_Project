import { defaultAccountsRepository } from "api/repositories/accounts/AccountsRepository";
import { UserInfoResponseModel } from "api/repositories/accounts/model/UserInfoResponse";
import { SidebarMenuConfigModel } from "api/repositories/sidebarMenu/model/SidebarMenuConfigModel";
import SidebarMenuConfigRepository from "api/repositories/sidebarMenu/SidebarMenuConfigRepository";
import { isEmpty, isUndefined } from "lodash";
import {
  Context,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import LocalizedStrings from "react-localization";
import { useHistory } from "react-router-dom";
import { getMessage } from "utils/helpersInTs/helpersInTs";
import { strings } from "utils/localizedStrings";
import { engLocalizedStrings } from "utils/localizedStrings/english";
import { VnLocalizedStrings } from "utils/localizedStrings/vietnam";
import { ContextModel } from "./model/ContextModel";
import { RcFile, UploadFile } from "antd/es/upload";

export const LocalContext: Context<ContextModel> = createContext(
  new ContextModel()
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoResponseModel>({});
  const history = useHistory();
  const [info, setInfo] = useState("");
  const token = localStorage.getItem("neci-cms-token");
  const [menuConfig, setMenuConfig] =
    useState<SidebarMenuConfigModel>(undefined);
  const [language, setLanguage] = useState<string>("vi");
  const [localStrings, setLocalStrings] = useState<typeof strings>(
    new LocalizedStrings({
      lang: language === "vi" ? VnLocalizedStrings : engLocalizedStrings,
    })
  );
  const [sessionLog, setSessionLog] = useState<{
    sessionId: Array<string>;
    portrait: UploadFile | string;
    image: string;
  }>({
    sessionId: [],
    portrait: "",
    image: "",
  });

  const getRoles = useCallback(async () => {
    try {
      const { data } = await defaultAccountsRepository?.getUser();
      if (data) {
        setUser(data);
        await getSidebar(data?.isAdmin, localStorage?.getItem("language"));
      }
    } catch (error) {
      console.log(error);
      localStorage?.clear();
      getMessage(strings.GlobalMessage.SystemError, 4, "error");
      history?.push("/login");
    }
  }, [history]);

  const getSidebar = useCallback(
    async (role: boolean, language: string) => {
      try {
        const siderConfig = await SidebarMenuConfigRepository?.getSidebarMenu(
          role,
          localStrings
        );
        setMenuConfig(siderConfig?.data);
        localStorage?.setItem("menu", JSON.stringify(siderConfig?.data));
      } catch (error) {
        console.log(error);
      }
    },
    [user, language]
  );

  const getPartnerInfo = (value: any) => {
    setInfo(value);
  };

  const checkLanguage = async () => {
    const savedLanguage = localStorage?.getItem("language");
    if (savedLanguage === "vi") {
      setLocalStrings(
        new LocalizedStrings({
          lang: VnLocalizedStrings,
        })
      );
    } else {
      setLocalStrings(
        new LocalizedStrings({
          lang: engLocalizedStrings,
        })
      );
    }
  };

  useEffect(() => {
    if (!isEmpty(token) && !isUndefined(token)) {
      getRoles();
    }
  }, [token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkLanguage();
    }
  }, [language]);

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <LocalContext.Provider
      value={{
        user: user,
        getPartnerInfo: getPartnerInfo,
        info,
        menuConfig,
        getRoles,
        getSidebar,
        isAuthenticated,
        localStrings,
        setLocalStrings,
        language,
        setLanguage,
        sessionLog,
        setSessionLog
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};

export const AuthenticationContext = () => useContext(LocalContext);
