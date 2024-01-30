import { UserRoles } from '@/enums/roles';
export interface IUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: typeof UserRoles;
}

export interface IResponseData<T> {
  data: T;
  meta?: IPaginationMeta;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface IQueryParams {
  page?: number;
  limit?: number;
  searchText?: string;
  order_by?: string;
  order_type?: string;
}
