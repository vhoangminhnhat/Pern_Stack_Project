import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";
import {
  MenuConfigModel,
  SidebarMenuConfigModel,
} from "./model/SidebarConfigModel";
import { strings } from "utils/localizedStrings";
import { IoHome, IoPersonAddOutline } from "react-icons/io5";
import { FaHotel } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdSwitchAccount } from "react-icons/md";

export interface IConfigRepository {
  getSidebarMenu(): Promise<BaseApiResponseModel<SidebarMenuConfigModel>>;
}

export class SidebarRepository implements IConfigRepository {
  getSidebarMenu(): Promise<BaseApiResponseModel<SidebarMenuConfigModel>> {
    return new Promise(async (resolve, reject) => {
      let menuConfig = [
        new MenuConfigModel(
          strings.Sidebar.Home,
          "/",
          "home",
          <IoHome className="text-xl" />,
          []
        ),
        new MenuConfigModel(
          strings.Sidebar.Management,
          "/management",
          "",
          <BiSolidFoodMenu className="text-xl" />,
          [
            new MenuConfigModel(
              strings.Sidebar.Hotel,
              "/management/hotels",
              "hotels",
              <FaHotel className="text-xl" />
            ),
            new MenuConfigModel(
              strings.Sidebar.Employee,
              "/management/employee",
              "employee",
              <IoPersonAddOutline className="text-xl" />
            ),
          ]
        ),
        new MenuConfigModel(
          strings.Sidebar.Personal,
          "/account",
          "account",
          <MdSwitchAccount className="text-xl" />,
          []
        ),
      ] as MenuConfigModel[];
      try {
        return menuConfig;
      } catch (error) {
        console.log(error);
      }
      resolve(
        new BaseApiResponseModel<SidebarMenuConfigModel>(
          new SidebarMenuConfigModel(menuConfig),
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
      );
    });
  }
};

export default new SidebarRepository();
