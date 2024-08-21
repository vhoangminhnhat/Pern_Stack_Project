import { strings } from "utils/localizedStrings";
import { MenuConfigModel } from "../sidebar/model/SidebarConfigModel";
import { TbLogout } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";

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
  new MenuConfigModel(
    strings.Sidebar.Hotel,
    "/management/hotels",
    "HotelsFeature",
    <FaHotel className="text-xl" />
  ),
];
