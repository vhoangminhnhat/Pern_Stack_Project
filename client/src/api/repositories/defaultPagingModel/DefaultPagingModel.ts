export class DefaultPagingModel {
  constructor(public current: number, public pageSize: number) {
    (this.current = current), (this.pageSize = pageSize);
  }
}
