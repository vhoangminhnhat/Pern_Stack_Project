import {
  BookOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  InfoOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import { FaGuilded, FaResearchgate } from "react-icons/fa";
import { MdArticle, MdClass, MdModelTraining } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { strings } from "utils/localizedStrings";
import {
  MenuConfigModel,
  SidebarMenuConfigModel,
} from "./model/SidebarMenuConfigModel";
import { ReactNode } from "react";

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
        let admin = [];
        let user = [];
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
              new MenuConfigModel(
                localStrings?.TestSidebar?.Personal?.TrainingProcess,
                "/personal/training-process",
                "TraningProcessFeature",
                <MdModelTraining />,
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
                localStrings?.TestSidebar?.Teachings?.Classes,
                "/teachings/classes",
                "ClassFeature",
                <MdClass />,
                []
              ),
              new MenuConfigModel(
                localStrings?.TestSidebar?.Teachings.Instruction,
                "/teachings/instruction",
                "InstructionFeature",
                <FaGuilded />,
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
        // const res = await defaultPathConfigRepository?.configDetail(
        //   "neci_cms_navigations"
        // );
        // if (res) {
        //   let data = JSON.parse(res?.data?.config as string);
        //   if (language === "vi") {
        //     admin = data?.admin;
        //     user = data?.user;
        //   } else {
        //     admin = data?.engAdmin;
        //     user = data?.engUser;
        //   }

        //   switch (role) {
        //     case true:
        //       menuConfig = admin?.map((item: IMenuService) => {
        //         return new MenuConfigModel(
        //           item?.name,
        //           item?.path,
        //           item?.componentName,
        //           item?.icon,
        //           item?.subMenu?.map((sub: any) => {
        //             return new MenuConfigModel(
        //               sub?.name,
        //               sub?.path,
        //               sub?.componentName,
        //               sub?.icon
        //             );
        //           })
        //         );
        //       });
        //       break;
        //     case false:
        //       menuConfig = user?.map((item: IMenuService) => {
        //         return new MenuConfigModel(
        //           item?.name,
        //           item?.path,
        //           item?.componentName,
        //           item?.icon,
        //           item?.subMenu?.map((sub: any) => {
        //             return new MenuConfigModel(
        //               sub?.name,
        //               sub?.path,
        //               sub?.componentName,
        //               sub?.icon
        //             );
        //           })
        //         );
        //       });
        //       break;
        //     default:
        //       return undefined;
        //   }
        // }
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
