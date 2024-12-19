import { ErrorData } from "api/repositories/packagesManagement/topupManagement/model/listFromB2B/addPackageFromB2B/AddPackageFromB2BResponseModel";
import { TopupResponseModel } from "api/repositories/packagesManagement/topupManagement/model/TopupResponseModel";

export class BaseApiResponseModel<T extends Object> {
  passedDelete: any;
  constructor(
    public data: T,
    public paging: Paging,
    public pagination: Paging,
    public message: string,
    public error: Error,
    public code: number,
    public report: Report,
    public passedData?: TopupResponseModel[] | [],
    public errData?: ErrorData[] | []
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

export class Result {
  type: "success" | "error";
  message: string;
}

export default {
  BaseApiResponseModel,
  Error,
};
