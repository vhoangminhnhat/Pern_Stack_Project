export class PackagesRegistrationListResponseModel {
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  email?: string;
  address?: string;
  fullName?: string;
  package?: {
    name?: string;
    code?: string;
    storage?: number;
    durationDay?: number;
    price?: string;
  };
}
