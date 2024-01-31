import { IOrderService } from '@/redux/api/order/types';

export interface ICreateUpdateOrderServiceProps {
  modalProps: {
    initialValues?: IOrderService[];
    title: string;
    order_id: number;
  };
  modalParams: any;
}
