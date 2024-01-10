export class ReqPagination<T> {
  findAndCount: [array: T[], length: number];
  skip: number;
  take: number;
  page: number;
}
