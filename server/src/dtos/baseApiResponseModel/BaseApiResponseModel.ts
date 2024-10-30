export class BaseApiResponseModel<T extends Object> {
  constructor(
    public message: string,
    public data?: T,
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
