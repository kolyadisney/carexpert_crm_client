import { ActionTypes } from '@/enums/action-types';
import { IUser } from '@/redux/types';

export interface IComponentOwnProps {
  actionType: ActionTypes;
  initialValues?: IUser;
}
