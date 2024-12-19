import { CONTENT_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ContentManagementRequestModel } from "./model/ContentManagementRequestModel";
import { ContentManagementResponseModel } from "./model/ContentManagementResponseModel";

export interface IContentManagementRepository {
  getContentList(
    params: ContentManagementRequestModel
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel[]>>;
  createContent(
    body: FormData
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel>>;
  updateContent(
    body: FormData
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel>>;
  deleteContent(params: { id: string }): Promise<BaseApiResponseModel<Object>>;
}

class ContentManagementImpl implements IContentManagementRepository {
  async getContentList(
    params: ContentManagementRequestModel
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel[]>> {
    return await client?.get(CONTENT_MANAGEMENT?.LIST, params);
  }
  async createContent(
    body: FormData
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel>> {
    return await client?.post(CONTENT_MANAGEMENT?.CREATE_CONTENT, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async updateContent(
    body: FormData
  ): Promise<BaseApiResponseModel<ContentManagementResponseModel>> {
    return await client?.put(CONTENT_MANAGEMENT?.UPDATE_CONTENT, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async deleteContent(params: {
    id: string;
  }): Promise<BaseApiResponseModel<Object>> {
    return await client?.delete(CONTENT_MANAGEMENT?.DELETE_CONTENT, params);
  }
}

export const defaultContentRepository = new ContentManagementImpl();
