import { PATH_CONFIG } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { PathConfigCreateRequestModel } from "./model/createAction/PathConfigCreateRequestModel";
import { PathConfigDetailResponseModel } from "./model/detail/PathConfigDetailResponseModel";
import { PathConfigRequestModel } from "./model/PathConfigRequestModel";
import { PathConfigResponseModel } from "./model/PathConfigResponseModel";
import { PathConfigUpdateRequestModel } from "./model/updateAction/PathConfigUpdateRequestModel";

export interface IPathConfigRepository {
  getList(
    params: PathConfigRequestModel
  ): Promise<BaseApiResponseModel<PathConfigResponseModel[]>>;
  updateConfig(
    body: PathConfigUpdateRequestModel,
    id: string
  ): Promise<BaseApiResponseModel<PathConfigResponseModel>>;
  createConfig(
    body: PathConfigCreateRequestModel
  ): Promise<BaseApiResponseModel<PathConfigResponseModel>>;
  deleteConfig(id: string): Promise<BaseApiResponseModel<unknown>>;
  configDetail(
    id: string
  ): Promise<BaseApiResponseModel<PathConfigDetailResponseModel>>;
}

class PathConfigImpl implements IPathConfigRepository {
  async getList(
    params: PathConfigRequestModel
  ): Promise<BaseApiResponseModel<PathConfigResponseModel[]>> {
    return await client?.get(PATH_CONFIG?.LIST, params);
  }
  async updateConfig(
    body: PathConfigUpdateRequestModel,
    code: string
  ): Promise<BaseApiResponseModel<PathConfigResponseModel>> {
    return await client?.put(`${PATH_CONFIG?.UPDATE_CONFIG}/${code}`, body);
  }
  async createConfig(
    body: PathConfigCreateRequestModel
  ): Promise<BaseApiResponseModel<PathConfigResponseModel>> {
    return await client?.post(PATH_CONFIG?.CREATE_CONFIG, body);
  }
  async deleteConfig(id: string): Promise<BaseApiResponseModel<unknown>> {
    return await client?.delete(`${PATH_CONFIG?.DELETE_CONFIG}/${id}`);
  }
  async configDetail(
    code: string
  ): Promise<BaseApiResponseModel<PathConfigDetailResponseModel>> {
    return await client?.get(`${PATH_CONFIG?.CONFIG_DETAIL}/${code}`);
  }
}

export const defaultPathConfigRepository = new PathConfigImpl();
