'use client';
import React from 'react';
import { Button, Table, Tag, Tooltip } from 'antd';
import { IComponentOwnProps } from '@/components/tables/orders/types';
import Link from 'next/link';
import { routes } from '@/routes';
import { IOrder } from '@/redux/api/order/types';
import { OrderStatusColor, OrderStatusName } from '@/enums/order-status';
import { IClient } from '@/redux/api/client/types';
import ButtonGroup from 'antd/es/button/button-group';
import { EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import {
  makeTableFilters,
  makeTablePagination,
} from '@/components/tables/config';
import { TABLE_NAME } from '@/components/tables/clients/config';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setOrderFilters } from '@/redux/slice/filtersSlice';

export const TableOrders: React.FC<IComponentOwnProps> = ({
  loading,
  data,
  meta,
}) => {
  const router = useRouter();
  const filters = useAppSelector((state) => state.filters.orderFilters);
  const dispatch = useAppDispatch();
  const columns: any = [
    {
      title: '№',
      dataIndex: 'id',
      width: '100px',
      align: 'center',
    },
    {
      title: 'Клиент',
      key: 'client_id',
      dataIndex: 'client_id',
      render: (client_id: string, record: IOrder) => {
        return (
          <Link href={routes['client'].link(client_id)}>
            {`${record.client.first_name} ${record.client.last_name}`}
          </Link>
        );
      },
    },
    {
      title: 'Авто',
      key: 'car_id',
      dataIndex: 'car_id',
      render: (car_id: string, record: IOrder) => {
        return (
          <Link
            href={routes['car'].link(car_id)}
          >{`${record.car.brand} ${record.car.model} ${record.car.year} | ${record.car.car_number} | ${record.car.vin}`}</Link>
        );
      },
    },
    {
      title: 'Описание',
      dataIndex: 'description',
    },
    {
      title: 'Статус заказа',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        return (
          <Tag className={OrderStatusColor[status]}>
            {OrderStatusName[status]}
          </Tag>
        );
      },
    },
    {
      title: 'Создан',
      key: 'created_at',
      dataIndex: 'created_at',
      sorter: true,
      render: (created_at: string) => {
        return dayjs(created_at).format('DD.MM.YYYY');
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      render: (_: any, record: IClient) => {
        return (
          <ButtonGroup size={'small'}>
            <Tooltip placement={'top'} title={'Просмотреть'}>
              <Button
                type={'primary'}
                icon={<EyeOutlined />}
                onClick={() => router.push(routes['order'].link(record.id))}
              />
            </Tooltip>
            {/*<Tooltip placement={'top'} title={'Удалить'}>*/}
            {/*  <Popconfirm*/}
            {/*    title={'Вы действительно хотите удалить?'}*/}
            {/*    onConfirm={() => console.log('#record', record.id)}*/}
            {/*  >*/}
            {/*    <Button type={'primary'} danger icon={<DeleteOutlined />} />*/}
            {/*  </Popconfirm>*/}
            {/*</Tooltip>*/}
          </ButtonGroup>
        );
      },
    },
  ];
  return (
    <Table
      loading={loading}
      dataSource={data}
      columns={columns}
      size={'small'}
      pagination={makeTablePagination(TABLE_NAME, {
        current: filters.page,
        defaultPageSize: 12,
        total: meta?.total,
      })}
      onChange={(pagination: any, filters: any, sorter: any) => {
        dispatch(
          setOrderFilters(makeTableFilters(pagination, filters, sorter)),
        );
      }}
    />
  );
};
