export class StudentDropoutPredictionRequestModel {
  data?: Array<{
    Gender: number;
    "Curricular units 1st sem (enrolled)": number;
    "Curricular units 1st sem (approved)": number;
    "Curricular units 1st sem (grade)": number;
    "Curricular units 2nd sem (enrolled)": number;
    "Curricular units 2nd sem (approved)": number;
    "Curricular units 2nd sem (grade)": number;
    Debtor: number;
    "Tuition fees up to date": number;
    total_enrolled: number;
    total_approved: number;
    total_failed: number;
    average_grade: number;
    unpassed_courses: number;
  }>;
}

export class StudentDropoutPredictionResponseModel {
  predictions?: number[];
}

export class StudentDropoutDataModel {
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
