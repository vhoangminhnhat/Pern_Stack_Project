export class ScheduleManagementResponseModel {
  id?: string;
  teacherId?: string;
  subjectId?: string;
  className?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
  teacher?: {
    id?: string;
    fullName?: string;
  };
  subject?: {
    id?: string;
    name?: string;
    code?: string;
  };
}
