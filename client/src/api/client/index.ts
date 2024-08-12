import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseMode";
import axios from "axios";
import ModelConverter from "utils/modelConverter/ModelConverter";
import ApiConfigModel from "./IApiClient";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 60000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const request = config;

    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
      } as any;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Attempt to get the actual error returned from API
    const err = error.response || error;
    if (error?.response?.status === 403) {
      if (!!localStorage.getItem("token")) {
        localStorage.clear();
        window.location.href = "/login"; //relative to domain
      }
    }
    return Promise.reject(err.data); // Propagate rejection back to caller
  }
);

class AxiosClient implements ApiConfigModel {
  async post<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.post(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async get<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.get(path, {
      params: data,
    });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async delete<T extends Object>(
    path: string,
    data: Map<string, any> | any = {}
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.delete(path, {
      params: data,
    });
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }

  async put<T extends Object>(
    path: string,
    data: Map<string, any> | any = {},
    config?: Map<string, any> | any
  ): Promise<BaseApiResponseModel<T>> {
    let response = await api.put(path, data, config);
    return ModelConverter.decode(response, BaseApiResponseModel<T>);
  }
}
