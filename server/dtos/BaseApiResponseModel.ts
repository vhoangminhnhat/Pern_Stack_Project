export class BaseApiResponseModel<T extends Object> {
  constructor(
    public message: string,
    public error?: Error,
    public paging?: Paging,
    public pagination?: Paging,
    public data?: T,
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
