import { ActionTypes } from '@/enums/action-types';
import { IService } from '@/redux/api/service/types';

export interface IModalOwnProps {
  modalProps: {
    actionType: ActionTypes;
    title: string;
    initialValues?: IService;
    categoryId?: string;
    categoryName?: string;
  };
  modalParams: any;
}
