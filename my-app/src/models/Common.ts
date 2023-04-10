export interface ListResponse<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}
