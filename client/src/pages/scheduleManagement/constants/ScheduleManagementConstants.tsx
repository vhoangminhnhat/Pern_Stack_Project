import { ColumnsType } from "antd/es/table";
import { ScheduleManagementResponseModel } from "api/repositories/scheduleManagement/model/ScheduleManagementResponseModel";
import { FilterAttributes } from "components/generalComponents/filterComponents/model/FilterComponentsModel";
import moment from "moment";
import { strings } from "utils/localizedStrings";

export class ScheduleManagementConstants {
  static mainColumns(localStrings: typeof strings) {
    return Object.entries(localStrings.ScheduleManagement.Columns)?.map(
      ([key, val]) => {
        return {
          title: val,
          dataIndex: key,
          key: `schedule-${key}`,
          align: "center",
          ellipsis: {
            showTitle: true,
          },
          render: (text: any, record: ScheduleManagementResponseModel) => {
            switch (key) {
              case "startTime":
                return text ? moment(text).format("DD/MM/YYYY HH:mm") : localStrings.GlobalLabels.NoInfo;
              case "endTime":
                return text ? moment(text).format("DD/MM/YYYY HH:mm") : localStrings.GlobalLabels.NoInfo;
              case "teacher":
                return record.teacher?.fullName || localStrings.GlobalLabels.NoInfo;
              case "subject":
                return record.subject?.name || localStrings.GlobalLabels.NoInfo;
              default:
                return text ? text : localStrings.GlobalLabels.NoInfo;
            }
          },
        };
      }
    ) as ColumnsType<ScheduleManagementResponseModel>;
  }

  static filters(localStrings: typeof strings) {
    return [
      {
        colLg: 8,
        defaultValue: "",
        filterName: "className",
        filterType: "input",
        labelName: localStrings.ScheduleManagement.Labels.className,
        options: [],
        placeholder: localStrings.ScheduleManagement.Labels.className,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "teacherId",
        filterType: "select",
        labelName: localStrings.ScheduleManagement.Labels.teacher,
        options: [], // Will be populated with teachers
        placeholder: localStrings.ScheduleManagement.Labels.teacher,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "subjectId",
        filterType: "select",
        labelName: localStrings.ScheduleManagement.Labels.subject,
        options: [], // Will be populated with subjects
        placeholder: localStrings.ScheduleManagement.Labels.subject,
      },
    ] as FilterAttributes[];
  }
}
