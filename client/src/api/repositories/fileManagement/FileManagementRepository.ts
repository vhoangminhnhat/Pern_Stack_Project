import { FILE_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { FileManagementRequestModel } from "./model/FileManagementRequestModel";
import { FileManagementResponseModel } from "./model/FileManagementResponseModel";

export interface IFileManagementRepository {
  getList(
    params: FileManagementRequestModel
  ): Promise<BaseApiResponseModel<FileManagementResponseModel[]>>;
  uploadFiles(
    formData: FormData
  ): Promise<BaseApiResponseModel<FileManagementResponseModel>>;
  replaceFiles(
    formData: FormData
  ): Promise<BaseApiResponseModel<FileManagementResponseModel>>;
  deleteFiles(params: {
    code: string;
  }): Promise<BaseApiResponseModel<FileManagementRequestModel>>;
}

class FileManagementImpl implements IFileManagementRepository {
  async getList(
    params: FileManagementRequestModel
  ): Promise<BaseApiResponseModel<FileManagementResponseModel[]>> {
    return await client?.get(FILE_MANAGEMENT?.LIST, params);
  }
  async uploadFiles(
    formData: FormData
  ): Promise<BaseApiResponseModel<FileManagementResponseModel>> {
    return await client?.post(FILE_MANAGEMENT?.UPLOAD_FILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async replaceFiles(
    formData: FormData
  ): Promise<BaseApiResponseModel<FileManagementResponseModel>> {
    return await client?.put(FILE_MANAGEMENT?.REPLACE_FILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async deleteFiles(params: {
    code: string;
  }): Promise<BaseApiResponseModel<FileManagementRequestModel>> {
    return await client?.delete(FILE_MANAGEMENT?.DELETE_FILE, params);
  }
}

export const defaultFileManagementRepository = new FileManagementImpl();
