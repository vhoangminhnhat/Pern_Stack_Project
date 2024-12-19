import { BookOutlined, GlobalOutlined } from "@ant-design/icons";
import { PathConfigDetailResponseModel } from "api/repositories/pathConfig/model/detail/PathConfigDetailResponseModel";
import { ActionsComponentType } from "components/generalComponents/actionsComponent/model/ActionsComponentModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export const PathConfigConstants = (localStrings: typeof strings) => {
  return {
    filterAttributes: [
      {
        colLg: 12,
        defaultValue: "",
        filterName: "title",
        filterType: "input",
        labelName: localStrings.PathConfigManagement.Columns.Title,
        options: [],
        placeholder: localStrings.PathConfigManagement.Placeholder.Title,
        prefixIcon: <BookOutlined />,
      },
      {
        colLg: 12,
        defaultValue: "",
        filterName: "path",
        filterType: "input",
        labelName: localStrings.PathConfigManagement.Columns.Path,
        options: [],
        placeholder: localStrings.PathConfigManagement.Placeholder.Path,
        prefixIcon: <GlobalOutlined />,
      },
    ] as FilterAttributes[],

    actionAttributes: () => {
      const defaultAttributes: ActionsComponentType<PathConfigDetailResponseModel>[] =
        [
          {
            label: localStrings.PathConfigManagement.Columns.Title,
            name: "title",
            placeholder: localStrings.PathConfigManagement.Placeholder.Title,
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.PathConfigManagement.Placeholder.Title,
            },
            pointerEvents: false,
            type: "input",
            detailKey: "title",
          },
          {
            label: localStrings.PathConfigManagement.Columns.Code,
            name: "code",
            placeholder: localStrings.GlobalPlaceholder.Code,
            createFormRules: {
              stricted: true,
              type: "string",
              message: localStrings.GlobalPlaceholder.Code,
            },
            pointerEvents: false,
            type: "input",
            detailKey: "code",
          },
          {
            label: localStrings.PathConfigManagement.Columns.Description,
            name: "description",
            placeholder:
              localStrings.PathConfigManagement.Placeholder.Description,
            createFormRules: {
              stricted: false,
              type: "string",
              message:
                localStrings.PathConfigManagement.Placeholder.Description,
            },
            pointerEvents: false,
            type: "text-area",
            detailKey: "description",
          },
        ];
      return defaultAttributes;
    },
  };
};
