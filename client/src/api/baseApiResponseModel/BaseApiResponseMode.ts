export class BaseApiResponseModel<T extends Object> {
  constructor(
    public data: T,
    public paging: Paging,
    public pagination: Paging,
    public message: string,
    public error: Error,
    public code: number,
    public report: Report
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

export class Report {
  day?: number;
  week?: number;
  month?: number;
  lastMonth?: number;
}

export default {
  BaseApiResponseModel,
  Error,
};
