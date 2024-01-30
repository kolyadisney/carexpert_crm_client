import { PartStatus } from '@/enums/part-status';

export interface IPart {
  id: string;
  name: string;
  brand: string;
  supplier: string;
  price: number;
  code: string;
  status: PartStatus;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ICreatePartPayload
  extends Omit<IPart, 'id' | 'updated_at' | 'created_at'> {}

export interface IUpdatePartPayload {
  id: string;
  payload: ICreatePartPayload;
}
