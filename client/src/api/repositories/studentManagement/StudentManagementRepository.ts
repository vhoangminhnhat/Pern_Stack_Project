import { STUDENT_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { StudentManagementResponseModel } from "./model/StudentManagementResponseModel";
import { StudentManagmentRequestModel } from "./model/StudentManagmentRequestModel";
import { CreateStudentResponseModel } from "./model/create/CreateStudentResponseModel";
import { DropoutPredictionResponseModel } from "./model/dropoutPrediction/DropoutPredictionResponseModel";

export interface IStudentManagementRepository {
  getList(
    params: StudentManagmentRequestModel
  ): Promise<BaseApiResponseModel<Array<StudentManagementResponseModel>>>;
  createStudent(
    body: CreateStudentResponseModel
  ): Promise<BaseApiResponseModel<CreateStudentResponseModel>>;
  predictDropout(params: {
    studentIds: string[];
  }): Promise<BaseApiResponseModel<Array<DropoutPredictionResponseModel>>>;
  predictDropoutFromFile(
    formData: FormData
  ): Promise<BaseApiResponseModel<any>>;
  getDropoutPredictionData(): Promise<BaseApiResponseModel<any>>;
}

class StudentManagementImpl implements IStudentManagementRepository {
  async getList(
    params: StudentManagmentRequestModel
  ): Promise<BaseApiResponseModel<Array<StudentManagementResponseModel>>> {
    return await client?.get(STUDENT_MANAGEMENT?.LIST, params);
  }

  async createStudent(
    body: CreateStudentResponseModel
  ): Promise<BaseApiResponseModel<CreateStudentResponseModel>> {
    return await client?.post(STUDENT_MANAGEMENT?.CREATE_STUDENT, body);
  }

  async predictDropout(params: {
    studentIds: string[];
  }): Promise<BaseApiResponseModel<Array<DropoutPredictionResponseModel>>> {
    return await client?.post(STUDENT_MANAGEMENT?.PREDICT_DROPOUT, params);
  }

  async predictDropoutFromFile(
    formData: FormData
  ): Promise<BaseApiResponseModel<any>> {
    return await client?.post(
      STUDENT_MANAGEMENT?.PREDICT_DROPOUT_FILE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getDropoutPredictionData(): Promise<BaseApiResponseModel<any>> {
    return await client?.get(STUDENT_MANAGEMENT?.DROPOUT_PREDICTION_DATA);
  }
}

export const defaultStudentManagementRepository = new StudentManagementImpl();
