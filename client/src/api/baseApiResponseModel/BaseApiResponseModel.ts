export class BaseApiResponseModel<T extends Object> {
  constructor(
    public data: T,
    public paging: Paging,
    public pagination: Paging,
    public message: string,
    public error: Error
  ) {}
}

export interface Paging {
  limit: number;
  page: number;
  total: number;
}

export class Error {
  code?: number;
  message?: string;
}

export default {
  BaseApiResponseModel,
  Error,
};
