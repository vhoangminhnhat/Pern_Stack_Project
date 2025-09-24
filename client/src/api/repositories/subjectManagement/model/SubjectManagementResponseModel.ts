export class SubjectManagementResponseModel {
  id?: string;
  name?: string;
  code?: string;
  schedules?: Array<{
    id?: string;
    className?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    teacher?: {
      id?: string;
      fullName?: string;
      username?: string;
    };
  }>;
  scores?: Array<{
    id?: string;
    score?: number;
    student?: {
      id?: string;
      fullName?: string;
      studentId?: string;
    };
  }>;
  _count?: {
    schedules?: number;
    scores?: number;
  };
}
