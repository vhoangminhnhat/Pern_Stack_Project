import { TEACHER_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { TeacherManagementResponseModel } from "./model/TeacherManagementResponseModel";
import { CreateTeacherResponseModel } from "./model/CreateTeacherResponseModel";
import { UpdateTeacherResponseModel } from "./model/UpdateTeacherResponseModel";

export interface ITeacherManagementRepository {
  getList(params?: {
    fullName?: string;
    username?: string;
    gender?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<TeacherManagementResponseModel>>>;
  getTeacher(id: string): Promise<BaseApiResponseModel<TeacherManagementResponseModel>>;
  createTeacher(
    body: CreateTeacherResponseModel
  ): Promise<BaseApiResponseModel<TeacherManagementResponseModel>>;
  updateTeacher(
    id: string,
    body: UpdateTeacherResponseModel
  ): Promise<BaseApiResponseModel<TeacherManagementResponseModel>>;
  deleteTeacher(id: string): Promise<BaseApiResponseModel<any>>;
}

class TeacherManagementImpl implements ITeacherManagementRepository {
  async getList(params?: {
    fullName?: string;
    username?: string;
    gender?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<TeacherManagementResponseModel>>> {
    return await client?.get(TEACHER_MANAGEMENT?.LIST, params);
  }

  async getTeacher(id: string): Promise<BaseApiResponseModel<TeacherManagementResponseModel>> {
    return await client?.get(`${TEACHER_MANAGEMENT?.GET_TEACHER}/${id}`);
  }

  async createTeacher(
    body: CreateTeacherResponseModel
  ): Promise<BaseApiResponseModel<TeacherManagementResponseModel>> {
    return await client?.post(TEACHER_MANAGEMENT?.CREATE_TEACHER, body);
  }

  async updateTeacher(
    id: string,
    body: UpdateTeacherResponseModel
  ): Promise<BaseApiResponseModel<TeacherManagementResponseModel>> {
    return await client?.put(`${TEACHER_MANAGEMENT?.UPDATE_TEACHER}/${id}`, body);
  }

  async deleteTeacher(id: string): Promise<BaseApiResponseModel<any>> {
    return await client?.delete(`${TEACHER_MANAGEMENT?.DELETE_TEACHER}/${id}`);
  }
}

export const defaultTeacherManagementRepository = new TeacherManagementImpl();
