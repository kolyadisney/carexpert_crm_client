import { ActionTypes } from '@/enums/action-types';
import { IServicesWithCategory } from '@/redux/api/service/types';

export interface IComponentOwnProps {
  actionType: ActionTypes;
  initialValues?: any;
  categoryId?: string;
  categoryName?: string;
}
