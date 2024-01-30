'use client';
import React from 'react';
import {
  Box,
  IPageHeadingAction,
  PageHeading,
  TableOrders,
} from '@/components';
import { routes } from '@/routes';
import { useGetAllOrdersQuery } from '@/redux/api/order';
import { OrderTableFilter } from '@/components/forms/tables-filters/order-table-filter';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ReloadOutlined } from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';

const OrdersPage = () => {
  const searchFilters = useAppSelector((state) => state.filters.orderFilters);
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch, isFetching } =
    useGetAllOrdersQuery(searchFilters);
  const pageHeadingActions = [
    {
      tooltip: {
        title: 'Обновить',
      },
      button: {
        type: 'dashed',
        htmlType: 'button',
        shape: 'circle',
        icon: <ReloadOutlined />,
        loading: isLoading || isFetching,
        onClick: () => refetch(),
      },
    },
    {
      button: {
        text: 'Создать заказ',
        type: 'primary',
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_ORDER,
              modalProps: {
                title: 'Добавить авто',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
  return (
    <Box>
      <PageHeading
        title={routes['orders'].name()}
        actions={pageHeadingActions}
      />
      <OrderTableFilter />
      <TableOrders
        loading={isLoading}
        data={data?.data || []}
        meta={data?.meta}
      />
    </Box>
  );
};

export default OrdersPage;
