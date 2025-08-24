import {
  BookOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import { ReactNode } from "react";
import { FaResearchgate } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { strings } from "utils/localizedStrings";
import {
  MenuConfigModel,
  SidebarMenuConfigModel,
} from "./model/SidebarMenuConfigModel";

export interface IConfigRepository {
  getSidebarMenu(
    role: boolean,
    localStrings: typeof strings
  ): Promise<BaseApiResponseModel<SidebarMenuConfigModel>>;
}

export interface IMenuService {
  name: string;
  path: string;
  componentName: string;
  icon: string | ReactNode;
  subMenu?: MenuConfigModel[] | [];
}

export class SidebarMenuConfigRepository implements IConfigRepository {
  getSidebarMenu(
    role: boolean,
    localStrings: typeof strings
  ): Promise<BaseApiResponseModel<SidebarMenuConfigModel>> {
    return new Promise(async (resolve, reject) => {
      let menuConfig: MenuConfigModel[] = [];
      try {
        menuConfig = [
          new MenuConfigModel(
            localStrings?.TestSidebar?.Personal?.Main,
            "/personal",
            "personal",
            <InfoCircleOutlined />,
            [
              new MenuConfigModel(
                localStrings?.TestSidebar?.Personal?.General,
                "/personal/generals",
                "GeneralsFeature",
                <UserOutlined />,
                []
              ),
            ]
          ),
          new MenuConfigModel(
            localStrings?.TestSidebar?.Teachings?.Main,
            "/teachings",
            "teachings",
            <PiChalkboardTeacher />,
            [
              new MenuConfigModel(
                localStrings?.StudentManagement?.Main,
                "/teachings/students",
                "StudentManagementFeature",
                <IoPersonOutline />,
                []
              ),
            ]
          ),
          new MenuConfigModel(
            localStrings?.TestSidebar?.Research?.Main,
            "/research",
            "Research",
            <FaResearchgate />,
            [
              new MenuConfigModel(
                localStrings?.TestSidebar?.Research?.Articles,
                "/research/articles",
                "ArticleFeature",
                <MdArticle />,
                []
              ),
              new MenuConfigModel(
                localStrings?.TestSidebar?.Research?.Books,
                "/research/books",
                "BookFeature",
                <BookOutlined />,
                []
              ),
            ]
          ),
        ];
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
}

export default new SidebarMenuConfigRepository();
