import { IClient } from '@/redux/api/client/types';
import { ActionTypes } from '@/enums/action-types';

export interface IComponentOwnProps {
  initialValues?: IClient;
  actionType: ActionTypes;
}
