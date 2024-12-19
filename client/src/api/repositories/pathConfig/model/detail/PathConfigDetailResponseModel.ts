export class PathConfigDetailResponseModel {
  createdAt?: string;
  code?: string;
  updatedAt?: string;
  id?: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  path?: string;
  config?: Record<string, unknown> | string;
  active?: number;
  type?: number;
}
