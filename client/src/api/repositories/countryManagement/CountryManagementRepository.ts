import { COUNTRY_MANAGEMENT } from "api/ApiPath";
import { BaseApiResponseModel } from "api/baseApiResponseModel/BaseApiResponseModel";
import client from "api/client";
import { CountryListRequestModel } from "./model/CountryListRequestModel";
import { CountryListResponseModel } from "./model/CountryListResponseModel";
import { CountryDetailResponseModel } from "./model/details/CountryDetailReponseModel";

export interface ICountryManagementRepository {
  getList(
    params: CountryListRequestModel
  ): Promise<BaseApiResponseModel<CountryListResponseModel[]>>;
  getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<CountryDetailResponseModel>>;
  updateCountry(
    formData: FormData
  ): Promise<BaseApiResponseModel<CountryListResponseModel>>;
  createCountry(
    formData: FormData
  ): Promise<BaseApiResponseModel<CountryListResponseModel>>;
  deleteCountry(parmas: {
    id: string;
  }): Promise<BaseApiResponseModel<CountryListResponseModel>>;
}

class CountryManagementImpl implements ICountryManagementRepository {
  async getList(
    params: CountryListRequestModel
  ): Promise<BaseApiResponseModel<CountryListResponseModel[]>> {
    return await client?.get(COUNTRY_MANAGEMENT?.LIST, params);
  }
  async getDetail(params: {
    id: string;
  }): Promise<BaseApiResponseModel<CountryDetailResponseModel>> {
    return await client?.get(COUNTRY_MANAGEMENT?.DETAIL, params);
  }
  async updateCountry(
    formData: FormData
  ): Promise<BaseApiResponseModel<CountryListResponseModel>> {
    return await client?.put(COUNTRY_MANAGEMENT?.UPDATE_COUNTRY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async createCountry(
    formData: FormData
  ): Promise<BaseApiResponseModel<CountryListResponseModel>> {
    return await client?.post(COUNTRY_MANAGEMENT?.CREATE_COUNTRY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  async deleteCountry(params: {
    id: string;
  }): Promise<BaseApiResponseModel<CountryListResponseModel>> {
    return await client?.delete(COUNTRY_MANAGEMENT?.DELETE, params);
  }
}

export const defaultCountryManagementRepository = new CountryManagementImpl();
