import { IPart } from '@/redux/api/part/types';
import { IOrderPart } from '@/redux/api/order/types';

export interface ICreateUpdatePartFormProps {
  part_id?: string;
  initialValues?: IPart;
}

export interface ICreateUpdateOrderPartsFormProps {
  order_id: number;
  initialValues?: IOrderPart[];
}
