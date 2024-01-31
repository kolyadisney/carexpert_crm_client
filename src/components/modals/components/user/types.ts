import { ActionTypes } from '@/enums/action-types';
import { IUser } from '@/redux/types';

export interface ICreateUpdateUserModalProps {
  modalProps: {
    actionType: ActionTypes;
    initialValues?: IUser;
    title: string;
  };
  modalParams: any;
}
