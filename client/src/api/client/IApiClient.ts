import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";

export default interface ApiConfigModel {
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
