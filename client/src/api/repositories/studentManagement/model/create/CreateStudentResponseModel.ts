export class CreateStudentResponseModel {
  studentId?: string;
  fullName?: string;
  gender?: string;
  birthDate?: string;
  curricularUnits1stSemEnrolled?: number;
  curricularUnits1stSemApproved?: number;
  curricularUnits1stSemGrade?: number;
  curricularUnits2ndSemEnrolled?: number;
  curricularUnits2ndSemApproved?: number;
  curricularUnits2ndSemGrade?: number;
  debtor?: boolean;
  tuitionFeesUpToDate?: boolean;
  totalEnrolled?: number;
  totalApproved?: number;
  totalFailed?: number;
  averageGrade?: number;
  unpassedCourses?: number;
}
