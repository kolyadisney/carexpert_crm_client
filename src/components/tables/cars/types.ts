import { ICar } from '@/redux/api/car/types';
import { IPaginationMeta } from '@/redux/types';

export interface IComponentOwnProps {
  loading: boolean;
  data: ICar[];
  meta: IPaginationMeta | undefined;
}
