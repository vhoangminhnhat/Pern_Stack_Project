import { ARTICLE_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import axios from "axios";
import client from "api/client";
import { ArticleManagementRequestModel } from "./model/ArticleManagementRequestModel";
import { ArticleManagementResponseModel } from "./model/ArticleManagementResponseModel";

export interface IArticleManagementRepository {
  getList(
    params: ArticleManagementRequestModel
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel[]>>;
  summarizeArticle(params: {
    code: string;
    url: string;
    type: string;
  }): Promise<
    BaseApiResponseModel<{
      summary: string;
      article: ArticleManagementResponseModel;
    }>
  >;
  createArticle(
    formData: FormData
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>>;
  updateArticle(
    id: string,
    formData: FormData
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>>;
  deleteArticle(
    id: string
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>>;
  downloadFile(filename: string): Promise<Blob>;
}

class ArticleManagementImpl implements IArticleManagementRepository {
  async getList(
    params: ArticleManagementRequestModel
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel[]>> {
    return await client?.get(ARTICLE_MANAGEMENT.LIST, params);
  }

  async summarizeArticle(params: {
    code: string;
    url: string;
    type: string;
  }): Promise<
    BaseApiResponseModel<{
      summary: string;
      article: ArticleManagementResponseModel;
    }>
  > {
    return await client?.get(ARTICLE_MANAGEMENT.SUMMARIZE, params);
  }

  async createArticle(
    formData: FormData
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>> {
    return await client?.post(ARTICLE_MANAGEMENT.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async updateArticle(
    id: string,
    formData: FormData
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>> {
    return await client?.put(`${ARTICLE_MANAGEMENT.UPDATE}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async deleteArticle(
    id: string
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel>> {
    return await client?.delete(`${ARTICLE_MANAGEMENT.DELETE}/${id}`);
  }

  async downloadFile(filename: string): Promise<Blob> {
    const token = localStorage.getItem("thesis-cms-token");
    const downloadUrl = `${ARTICLE_MANAGEMENT.DOWNLOAD}/${filename}`;
    
    const response = await axios({
      method: "GET",
      url: downloadUrl,
      responseType: "blob",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      withCredentials: true,
    });

    return response.data;
  }
}

export const defaultArticleManagementRepository = new ArticleManagementImpl();
