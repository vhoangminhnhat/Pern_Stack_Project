export class RoamingManagementRequestModel {
  constructor(
    public page: number,
    public limit: number,
    public country?: string,
    public region?: string,
    public category?: string,
    public name?: string,
    public code?: string,
    public pagination?: number
  ) {
    this.page = page;
    this.limit = limit;
    this.country = country;
    this.region = region;
    this.category = category;
    this.name = name;
    this.code = code;
    this.pagination = pagination;
  }
}
