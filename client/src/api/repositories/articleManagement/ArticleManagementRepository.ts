import { ARTICLE_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
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
}

export const defaultArticleManagementRepository = new ArticleManagementImpl();
