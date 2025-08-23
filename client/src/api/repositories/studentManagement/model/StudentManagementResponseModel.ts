export class StudentManagementResponseModel {
  studentId?: string;
  fullName?: string;
  gender?: number;
  curricularUnits1stSemEnrolled?: number;
  curricularUnits1stSemApproved?: number;
  curricularUnits1stSemGrade?: number;
  curricularUnits2ndSemEnrolled?: number;
  curricularUnits2ndSemApproved?: number;
  curricularUnits2ndSemGrade?: number;
  debtor?: number;
  tuitionFeesUpToDate?: number;
  totalEnrolled?: number;
  totalApproved?: number;
  totalFailed?: number;
  averageGrade?: number;
  unpassedCourses?: number;
}
