import { ARTICLE_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { ArticleManagementRequestModel } from "./model/ArticleManagementRequestModel";
import { ArticleManagementResponseModel } from "./model/ArticleManagementResponseModel";

export interface IArticleManagementRepository {
  getList(
    params: ArticleManagementRequestModel
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel[]>>;
  summarizeArticle(params: { code: string; url: string }): Promise<
    BaseApiResponseModel<{
      summary: string;
      article: ArticleManagementResponseModel;
    }>
  >;
}

class ArticleManagementImpl implements IArticleManagementRepository {
  async getList(
    params: ArticleManagementRequestModel
  ): Promise<BaseApiResponseModel<ArticleManagementResponseModel[]>> {
    return await client?.get(ARTICLE_MANAGEMENT.LIST, params);
  }

  async summarizeArticle(params: { code: string; url: string }): Promise<
    BaseApiResponseModel<{
      summary: string;
      article: ArticleManagementResponseModel;
    }>
  > {
    return await client?.get(ARTICLE_MANAGEMENT.SUMMARIZE, params);
  }
}

export const defaultArticleManagementRepository = new ArticleManagementImpl();
