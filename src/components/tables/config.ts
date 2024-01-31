import { PaginationProps, PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/es/table/interface';
import { Storage } from '@/services/storage';

export const scroll = {
  xs: { x: 300 },
  sm: { x: 576 },
  md: { x: 768 },
  lg: { x: 992 },
  xl: { x: 1200 },
  xxl: { x: 1600 },
};

export const getRememberPerPageLSKey = (tableName: string) =>
  `table-${tableName}-per-page`;

export const makeTablePagination = (
  tableName: string,
  params: PaginationProps,
) => {
  if (!tableName) return;

  const key = getRememberPerPageLSKey(tableName);

  const {
    current = 1,
    total = 0,
    size = 'small',
    showSizeChanger = true,
    pageSizeOptions = ['12', '24', '48', '72'],
    defaultPageSize = 12,
    onShowSizeChange = (page: number, per_page: number) => {
      Storage.set(key, per_page);
    },
  } = params;

  return {
    current,
    total,
    size,
    showSizeChanger,
    pageSizeOptions,
    defaultPageSize,
    onShowSizeChange,
  };
};

export const makeTableFilters = <T extends any>(
  pagination: PaginationConfig,
  filters: Partial<Record<keyof T, string[]>>,
  sorter: SorterResult<T>,
): any => {
  return {
    page: pagination.current,
    limit: pagination.pageSize,
    order_by: sorter.order ? sorter.field : undefined,
    order_type: sorter.order
      ? sorter.order === 'ascend'
        ? 'asc'
        : 'desc'
      : undefined,
  };
};
