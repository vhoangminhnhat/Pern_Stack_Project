export class ContentManagementRequestModel {
  constructor(
    public id?: string,
    public title?: string,
    public limit?: number,
    public page?: number,
    public active?: number,
  ) {
    this.id = id;
    this.title = title;
    this.limit - limit;
    this.page = page;
    this.active = active;
  }
}
