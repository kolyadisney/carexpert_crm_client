import { ActionTypes } from '@/enums/action-types';
import { IClient } from '@/redux/api/client/types';
import { IPart } from '@/redux/api/part/types';
import { IOrderPart, IOrderService } from '@/redux/api/order/types';

export interface IPartModalProps {
  modalProps: {
    actionType: ActionTypes;
    initialValues?: IPart;
    title: string;
    part_id: string;
  };
  modalParams: any;
}

export interface IOrderPartsModalProps {
  modalProps: {
    actionType: ActionTypes;
    initialValues?: IOrderPart[];
    title: string;
    order_id: number;
  };
  modalParams: any;
}
