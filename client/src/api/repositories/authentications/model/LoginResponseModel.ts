import { UserInfoResponseModel } from "api/repositories/accounts/model/UserInfoResponse";

export class LoginResponseModel implements UserInfoResponseModel {
  address?: string;
  avatar?: string;
  balance?: number;
  birthDay?: string;
  createdAt?: string;
  description?: string;
  email?: string;
  fullName?: string;
  id?: string;
  isAdmin?: boolean;
  isAffiliate?: boolean;
  isModerator?: boolean;
  partner?: string;
  phone?: string;
  userName?: string;
  accessToken?: {
    id?: string;
    ttl?: number;
    created?: string;
    expired?: number;
  };
}
