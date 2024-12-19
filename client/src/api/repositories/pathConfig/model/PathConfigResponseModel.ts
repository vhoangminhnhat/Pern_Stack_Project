export class ServiceConfigInfo {
  id?: string | '';
  name?: string | '';
  code?: string | '';
  screen?: string | '';
  iconUrl?: string | '';
  order?: number | 0;
  state?:
    | {
        type?: string;
        mode?: number;
      }
    | {};
  params?:
    | {
        tabIndex?: number;
        paymentType?: number;
      }
    | {};
}

export class PathConfigResponseModel {
  createdAt?: string | null;
  code?: string;
  updatedAt?: string | null;
  id?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  path?: string | null;
  config?: Record<string, unknown> | string;
  active?: number;
  type?: number;
}
