import { ColumnsType } from "antd/es/table";
import { ScheduleManagementResponseModel } from "api/repositories/scheduleManagement/model/ScheduleManagementResponseModel";
import { SubjectManagementResponseModel } from "api/repositories/subjectManagement/model/SubjectManagementResponseModel";
import { TeacherManagementResponseModel } from "api/repositories/teacherManagement/model/TeacherManagementResponseModel";
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
                return text
                  ? moment(text).format("DD/MM/YYYY HH:mm")
                  : localStrings.GlobalLabels.NoInfo;
              case "endTime":
                return text
                  ? moment(text).format("DD/MM/YYYY HH:mm")
                  : localStrings.GlobalLabels.NoInfo;
              case "teacher":
                return (
                  record.teacher?.fullName || localStrings.GlobalLabels.NoInfo
                );
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

  static filters(
    localStrings: typeof strings,
    teacherList: Array<TeacherManagementResponseModel>,
    subjectList: Array<SubjectManagementResponseModel>
  ) {
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
        options: [
          {
            label: localStrings?.GlobalLabels.All,
            value: "",
          },
          ...teacherList?.map((item) => ({
            label: item?.fullName,
            value: item?.id,
          })),
        ],
        placeholder: localStrings.ScheduleManagement.Labels.teacher,
      },
      {
        colLg: 8,
        defaultValue: "",
        filterName: "subjectId",
        filterType: "select",
        labelName: localStrings.ScheduleManagement.Labels.subject,
        options: [
          {
            label: localStrings?.GlobalLabels.All,
            value: "",
          },
          ...subjectList?.map((item) => ({
            label: item?.name,
            value: item?.id,
          })),
        ],
        placeholder: localStrings.ScheduleManagement.Labels.subject,
      },
    ] as FilterAttributes[];
  }
}
