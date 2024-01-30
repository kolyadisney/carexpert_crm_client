import { IClient } from '@/redux/api/client/types';
import { ICar } from '@/redux/api/car/types';
import { IService } from '@/redux/api/service/types';
import { OrderStatus } from '@/enums/order-status';
import { IPart } from '@/redux/api/part/types';

export interface IOrderService {
  id: string;
  created_at: string;
  updated_at: string;
  order_id: string;
  service_id: string;
  service: Pick<IService, 'name' | 'prices'>;
}

export interface IOrderPart {
  id: string;
  order_id: string;
  car_part_id: string;
  car_part: IPart;
  quantity: string;
  created_at: string;
  updated_at: string;
}

export interface IOrder {
  id: string;
  car_id: string;
  client_id: string;
  description: string;
  odometer: number;
  created_at: string;
  updated_at: string;
  client: Pick<IClient, 'first_name' | 'last_name'>;
  car: Pick<
    ICar,
    'car_number' | 'brand' | 'model' | 'year' | 'vin' | 'car_type' | 'color'
  >;
  order_services: IOrderService[];
  order_car_parts: IOrderPart[];
  status: OrderStatus;
}
