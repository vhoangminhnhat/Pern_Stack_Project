import { SCHEDULE_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ScheduleManagementResponseModel } from "./model/ScheduleManagementResponseModel";
import { CreateScheduleResponseModel } from "./model/CreateScheduleResponseModel";
import { UpdateScheduleResponseModel } from "./model/UpdateScheduleResponseModel";

export interface IScheduleManagementRepository {
  getList(params?: {
    teacherId?: string;
    subjectId?: string;
    className?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<ScheduleManagementResponseModel>>>;
  createSchedule(
    body: CreateScheduleResponseModel
  ): Promise<BaseApiResponseModel<ScheduleManagementResponseModel>>;
  updateSchedule(
    id: string,
    body: UpdateScheduleResponseModel
  ): Promise<BaseApiResponseModel<ScheduleManagementResponseModel>>;
  deleteSchedule(id: string): Promise<BaseApiResponseModel<any>>;
}

class ScheduleManagementImpl implements IScheduleManagementRepository {
  async getList(params?: {
    teacherId?: string;
    subjectId?: string;
    className?: string;
    page?: number;
    limit?: number;
  }): Promise<BaseApiResponseModel<Array<ScheduleManagementResponseModel>>> {
    return await client?.get(SCHEDULE_MANAGEMENT?.LIST, params);
  }

  async createSchedule(
    body: CreateScheduleResponseModel
  ): Promise<BaseApiResponseModel<ScheduleManagementResponseModel>> {
    return await client?.post(SCHEDULE_MANAGEMENT?.CREATE_SCHEDULE, body);
  }

  async updateSchedule(
    id: string,
    body: UpdateScheduleResponseModel
  ): Promise<BaseApiResponseModel<ScheduleManagementResponseModel>> {
    return await client?.put(`${SCHEDULE_MANAGEMENT?.UPDATE_SCHEDULE}/${id}`, body);
  }

  async deleteSchedule(id: string): Promise<BaseApiResponseModel<any>> {
    return await client?.delete(`${SCHEDULE_MANAGEMENT?.DELETE_SCHEDULE}/${id}`);
  }
}

export const defaultScheduleManagementRepository = new ScheduleManagementImpl();
