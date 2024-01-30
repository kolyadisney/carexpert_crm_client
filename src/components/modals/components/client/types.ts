import { ActionTypes } from '@/enums/action-types';
import { IClient } from '@/redux/api/client/types';

export interface IModalOwnProps {
  modalProps: {
    actionType: ActionTypes;
    initialValues?: IClient;
  };
  modalParams: any;
}
