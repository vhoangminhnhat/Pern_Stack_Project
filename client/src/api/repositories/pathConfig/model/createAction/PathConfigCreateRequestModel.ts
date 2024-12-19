
export class PathConfigCreateRequestModel {
  title?: string;
  code?: string;
  imageUrl?: string;
  description?: string;
  path?: string;
  active?: number;
  config?: Record<string, unknown> | string;
}
