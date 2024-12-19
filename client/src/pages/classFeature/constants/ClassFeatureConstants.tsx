import { ColumnsType } from "antd/es/table";
import { ClassManagementResponseModel } from "api/repositories/classManagement/model/ClassManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import { strings } from "utils/localizedStrings";

export class ClassFeatureConstants {
  static typeRender(localStrings: typeof strings) {
    return [
      {
        label: localStrings.ClassManagement.Theory,
        value: 1,
      },
      {
        label: localStrings.ClassManagement.Practice,
        value: 0,
      },
    ];
  }

  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.ClassManagement.Labels)?.map(
      ([key, val]) => {
        if (key === "type") {
          return {
            title: val,
            align: "center",
            dataIndex: key,
            key: `class-${key}`,
            render: (value) =>
              this.typeRender(localStrings)?.find(
                (item) => item?.value === value
              )?.label,
          };
        } else {
          return {
            title: val,
            align: "center",
            dataIndex: key,
            key: `class-${key}`,
          };
        }
      }
    ) as ColumnsType<ClassManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "name",
        filterType: "input",
        labelName: localStrings.ClassManagement.Labels.name,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Name,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "code",
        filterType: "input",
        labelName: localStrings.ClassManagement.Labels.code,
        options: [],
        placeholder: localStrings.GlobalPlaceholder.Code,
      },
      {
        colLg: 8,
        defaultValue: localStrings.GlobalLabels.All,
        filterName: "type",
        filterType: "select",
        labelName: localStrings.ClassManagement.Labels.type,
        options: this.typeRender(localStrings)
          ?.concat([{ label: localStrings.GlobalLabels.All, value: -1 }])
          ?.reverse(),
        placeholder: localStrings.GlobalPlaceholder.Type,
      },
    ] as FilterAttributes[];
  }
}
