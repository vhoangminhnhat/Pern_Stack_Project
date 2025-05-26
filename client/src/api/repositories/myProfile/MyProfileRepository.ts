import { BaseApiResponseModel } from "api/models/BaseApiResponseModel";
import { apiClient } from "api/services/ApiClient";
import { UserResponseModel } from "./models/UserResponseModel";

class MyProfileRepository {
  async getProfile(): Promise<BaseApiResponseModel<UserResponseModel>> {
    const response = await apiClient.get("/my-profile");
    return response.data;
  }

  async updateProfile(
    data: Partial<UserResponseModel>
  ): Promise<BaseApiResponseModel<UserResponseModel>> {
    const response = await apiClient.put("/my-profile", data);
    return response.data;
  }
}

export const myProfileRepository = new MyProfileRepository();
