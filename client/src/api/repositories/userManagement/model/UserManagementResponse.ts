export class RolesInfo {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  type?: number;
  status?: number;
}

export class UserManagementPartnerInfo {
  id?: string;
  code?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  type?: number;
  status?: number;
  apiKey?: string;
}

export class UserManagementResponseModel {
  createdAt?: string;
  id?: string;
  userName?: string;
  email?: string;
  fullName?: string;
  birthDay?: string;
  phone?: string;
  description?: string;
  type?: number;
  status?: UserManagementResponseModel["type"];
  address?: string;
  balance?: number;
  roles?: Array<RolesInfo> | [];
  partner?: UserManagementPartnerInfo;
}
