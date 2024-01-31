import { IPart } from '@/redux/api/part/types';
import { IOrderPart } from '@/redux/api/order/types';
import { ActionTypes } from '@/enums/action-types';

export interface ICreateUpdatePartFormProps {
  part_id?: string;
  initialValues?: IPart;
  actionType: ActionTypes;
}

export interface ICreateUpdateOrderPartsFormProps {
  order_id: number;
  initialValues?: IOrderPart[];
}
