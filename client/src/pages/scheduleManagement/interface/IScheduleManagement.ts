import { SubjectManagementResponseModel } from "api/repositories/subjectManagement/model/SubjectManagementResponseModel";
import { TeacherManagementResponseModel } from "api/repositories/teacherManagement/model/TeacherManagementResponseModel";

export interface IScheduleManagementAction {
  open: boolean;
  teacherList: Array<TeacherManagementResponseModel>;
  subjectList: Array<SubjectManagementResponseModel>;
  onClose: () => void;
  onSuccess: () => void;
  scheduleId?: string;
  isEdit?: boolean;
}
