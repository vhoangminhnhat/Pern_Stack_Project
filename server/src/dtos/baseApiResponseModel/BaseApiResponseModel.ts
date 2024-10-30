export class BaseApiResponseModel<T extends Object> {
  constructor(
    public data: T,
    public message: string,
    public error?: ErrorModel,
    public paging?: Paging,
    public pagination?: Paging
  ) {}
}

export class Paging {
  page?: number;
  limit?: number;
  total?: number;
}

export class ErrorModel {
  code?: number;
  message?: string;
}
