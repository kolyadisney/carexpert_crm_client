import { IService } from '@/redux/api/service/types';
import { IPaginationMeta } from '@/redux/types';
import React from 'react';

export interface IComponentOwnProps {
  loading: boolean;
  data: IService[];
  meta: IPaginationMeta | undefined;
  categoryId?: string;
  categoryName?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: IService;
  index: number;
  children: React.ReactNode;
}
