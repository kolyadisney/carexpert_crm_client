import { IPaginationMeta } from '@/redux/types';
import { IOrder } from '@/redux/api/order/types';

export interface IComponentOwnProps {
  loading: boolean;
  data: IOrder[];
  meta: IPaginationMeta | undefined;
}
