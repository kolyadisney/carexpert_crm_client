import { ICar } from '@/redux/api/car/types';
import { ActionTypes } from '@/enums/action-types';
import { IModalCommonProps } from '@/components/modals/types';

export interface IModalOwnProps extends IModalCommonProps {
  modalProps: {
    actionType: ActionTypes;
    client_id?: string;
    initialValues?: ICar;
  };
  modalParams: any;
}
