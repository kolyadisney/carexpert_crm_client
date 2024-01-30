import { IOrder, IOrderService } from '@/redux/api/order/types';
import { ActionTypes } from '@/enums/action-types';

export interface ICreateUpdateOrderServicesFormProps {
  order_id: number;
  initialValues?: IOrderService[];
}

export interface ICreateUpdateOrderFormProps {
  initialValues?: IOrder;
  actionType: ActionTypes;
}
