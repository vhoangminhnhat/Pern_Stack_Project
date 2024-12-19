import { RcFile, UploadFile } from "antd/es/upload";
import { UserInfoResponseModel } from "api/repositories/accounts/model/UserInfoResponse";
import { SidebarMenuConfigModel } from "api/repositories/sidebarMenu/model/SidebarMenuConfigModel";
import { Dispatch, SetStateAction } from "react";
import { strings } from "utils/localizedStrings";

export class ContextModel {
  user: UserInfoResponseModel;
  getPartnerInfo: (value: any) => void;
  info: string;
  menuConfig: SidebarMenuConfigModel;
  getRoles: () => Promise<void>;
  getSidebar: (role: boolean, language: string) => Promise<void>;
  isAuthenticated: () => boolean;
  language?: string;
  setLanguage?: Dispatch<SetStateAction<string>>;
  localStrings!: typeof strings;
  setLocalStrings!: Dispatch<SetStateAction<typeof strings>>;
  sessionLog: {
    sessionId: Array<string>;
    portrait: UploadFile | string;
    image: string;
  };
  setSessionLog: Dispatch<
    SetStateAction<{
      sessionId: Array<string>;
      portrait: UploadFile | string;
      image: string;
    }>
  >;
}
