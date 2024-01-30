import { IClient } from '@/redux/api/client/types';
import { IPaginationMeta } from '@/redux/types';

export interface IComponentOwnProps {
  loading: boolean;
  data: IClient[];
  meta: IPaginationMeta | undefined;
}
