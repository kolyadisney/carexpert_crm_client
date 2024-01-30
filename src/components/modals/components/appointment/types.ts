import { ActionTypes } from '@/enums/action-types';

export interface IModalOwnProps {
  modalProps: {
    title: string;
    actionType: ActionTypes;
    initialValues?: any;
    data?: any;
  };
  modalParams: any;
}
