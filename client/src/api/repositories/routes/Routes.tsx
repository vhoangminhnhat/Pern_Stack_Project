import { MenuConfigModel } from "../sidebar/model/SidebarConfigModel";
import { TbLogout } from "react-icons/tb";

export class Routers {
  constructor(
    public key: string,
    public title: string,
    public path: string,
    public icon: any,
    public componentName: string
  ) {}
}

export const HOST_MENUS: MenuConfigModel[] = [
  new MenuConfigModel("Đăng nhập", "sign-in", "SignInFeature", <TbLogout />),
  new MenuConfigModel("Đăng ký", "sign-up", "SignUpFeature", <TbLogout />),
];
