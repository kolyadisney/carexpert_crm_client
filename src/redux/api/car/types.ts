import { IClient } from '@/redux/api/client/types';
import { CarType } from '@/enums/car-type';
import { IOrder } from '@/redux/api/order/types';

export interface ICar {
  id: string;
  car_number: string;
  car_type: CarType;
  vin: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  client_id: string;
  Client?: IClient;
  orders?: IOrder[];
}

export interface ICreateCarPayload extends Omit<ICar, 'id'> {}
export interface IUpdateCarPayload {
  payload: ICreateCarPayload;
  id: string;
}
