export class TeacherManagementResponseModel {
  id?: string;
  username?: string;
  fullName?: string;
  gender?: string;
  profileAvatar?: string;
  code?: string;
  birthDay?: string;
  placeOfOrigin?: string;
  identifyCard?: string;
  dateOfIssue?: string;
  placeOfIssue?: string;
  religion?: string;
  createdAt?: string;
  updatedAt?: string;
  schedules?: Array<{
    id?: string;
    className?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    subject?: {
      id?: string;
      name?: string;
      code?: string;
    };
  }>;
}
