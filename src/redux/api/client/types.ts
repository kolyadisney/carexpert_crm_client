import { ICar } from '@/redux/api/car/types';

export interface IClient {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  cars?: ICar[];
}

export interface ICreateClientPayload extends Omit<IClient, 'id'> {}
export interface IUpdateClientPayload {
  payload: ICreateClientPayload;
  id: string;
}
