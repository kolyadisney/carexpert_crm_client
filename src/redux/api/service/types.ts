import { CarType } from '@/enums/car-type';

export interface IServicePrice {
  id: string;
  service_id: string;
  carType: CarType;
  price: number;
}

export interface IService {
  id: string;
  name: string;
  category_id: string;
  prices: IServicePrice[];
}
export interface IServicesWithCategory {
  id: string;
  name: string;
  services: IService[];
}

export interface IUpdateServiceCategoryPayload {
  id: string;
  name: string;
}

export interface ICreateServicePayload {
  name: string;
  category_id: string;
  priceForSedan: number;
  priceForSuv: number;
  priceForMinivan: number;
}

export interface UpdateServicePayload {
  id: string;
  payload: ICreateServicePayload;
}
