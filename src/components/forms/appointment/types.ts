import { ActionTypes } from '@/enums/action-types';

export interface IComponentOwnProps {
  actionType: ActionTypes;
  initialValues?: any;
  data?: any;
}
