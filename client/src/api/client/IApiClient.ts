import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";

export default interface IApiClient {
  post<T extends Object>(
    path: string,
    data: Map<string, any> | any,
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>>;

  get<T extends Object>(
    path: string,
    data: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>>;

  delete<T extends Object>(
    path: string,
    data: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>>;

  put<T extends Object>(
    path: string,
    data: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>>;
}
