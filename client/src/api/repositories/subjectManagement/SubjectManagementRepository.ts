import { SUBJECT_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { SubjectManagementResponseModel } from "./model/SubjectManagementResponseModel";
import { CreateSubjectResponseModel } from "./model/CreateSubjectResponseModel";
import { UpdateSubjectResponseModel } from "./model/UpdateSubjectResponseModel";

export interface ISubjectManagementRepository {
  getList(params?: {
    name?: string;
    code?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<SubjectManagementResponseModel>>>;
  getSubject(id: string): Promise<BaseApiResponseModel<SubjectManagementResponseModel>>;
  createSubject(
    body: CreateSubjectResponseModel
  ): Promise<BaseApiResponseModel<SubjectManagementResponseModel>>;
  updateSubject(
    id: string,
    body: UpdateSubjectResponseModel
  ): Promise<BaseApiResponseModel<SubjectManagementResponseModel>>;
  deleteSubject(id: string): Promise<BaseApiResponseModel<any>>;
}

class SubjectManagementImpl implements ISubjectManagementRepository {
  async getList(params?: {
    name?: string;
    code?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<SubjectManagementResponseModel>>> {
    return await client?.get(SUBJECT_MANAGEMENT?.LIST, params);
  }

  async getSubject(id: string): Promise<BaseApiResponseModel<SubjectManagementResponseModel>> {
    return await client?.get(`${SUBJECT_MANAGEMENT?.GET_SUBJECT}/${id}`);
  }

  async createSubject(
    body: CreateSubjectResponseModel
  ): Promise<BaseApiResponseModel<SubjectManagementResponseModel>> {
    return await client?.post(SUBJECT_MANAGEMENT?.CREATE_SUBJECT, body);
  }

  async updateSubject(
    id: string,
    body: UpdateSubjectResponseModel
  ): Promise<BaseApiResponseModel<SubjectManagementResponseModel>> {
    return await client?.put(`${SUBJECT_MANAGEMENT?.UPDATE_SUBJECT}/${id}`, body);
  }

  async deleteSubject(id: string): Promise<BaseApiResponseModel<any>> {
    return await client?.delete(`${SUBJECT_MANAGEMENT?.DELETE_SUBJECT}/${id}`);
  }
}

export const defaultSubjectManagementRepository = new SubjectManagementImpl();
