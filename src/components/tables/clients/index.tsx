'use client';
import { Button, Popconfirm, Table, Tooltip } from 'antd';

import React from 'react';
import {
  makeTableFilters,
  makeTablePagination,
  scroll,
} from '@/components/tables/config';
import { TABLE_NAME } from '@/components/tables/clients/config';
import { Truncate } from '@/components';
import { IComponentOwnProps } from '@/components/tables/clients/types';
import ButtonGroup from 'antd/es/button/button-group';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { routes } from '@/routes';
import { IClient } from '@/redux/api/client/types';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setClientFilters } from '@/redux/slice/filtersSlice';
import { useDeleteClientMutation } from '@/redux/api/client';

export const TableClients: React.FC<IComponentOwnProps> = ({
  loading,
  data,
  meta,
}) => {
  const filters = useAppSelector((state) => state.filters.clientFilters);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deleteClient, { isLoading }] = useDeleteClientMutation();
  return (
    <Table
      loading={loading || isLoading}
      dataSource={data}
      scroll={scroll.lg}
      rowKey={(record) => String(record.id)}
      size={'small'}
      pagination={makeTablePagination(TABLE_NAME, {
        current: filters.page,
        defaultPageSize: filters.limit,
        total: meta?.total,
      })}
      onChange={(pagination: any, filters: any, sorter: any) => {
        dispatch(
          setClientFilters(makeTableFilters(pagination, filters, sorter)),
        );
      }}
      columns={[
        {
          title: 'Клиент',
          dataIndex: 'first_name',
          sorter: true,
          render: (first_name: string, record) => {
            return `${record.first_name} ${record.last_name}`;
          },
        },
        {
          title: 'Номер телефона',
          dataIndex: 'phone',
          render: (phone: string) => (
            <Truncate type={'phone'} copy={phone}>
              {phone}
            </Truncate>
          ),
        },
        {
          title: 'Ел. почта',
          dataIndex: 'email',
          responsive: ['sm'],
          render: (email: string) => (
            <Truncate type={'email'} copy={email}>
              {email}
            </Truncate>
          ),
        },
        {
          title: 'Создан',
          sorter: true,
          dataIndex: 'created_at',
          render: (created_at: string) =>
            dayjs(created_at).format('DD.MM.YYYY'),
        },
        {
          title: '',
          dataIndex: 'actions',
          render: (_: any, record: IClient) => {
            return (
              <ButtonGroup size={'small'}>
                <Tooltip placement={'top'} title={'Просмотреть'}>
                  <Button
                    type={'primary'}
                    icon={<EyeOutlined />}
                    onClick={() =>
                      router.push(routes['client'].link(record.id))
                    }
                  />
                </Tooltip>
                <Tooltip placement={'top'} title={'Удалить'}>
                  <Popconfirm
                    title={'Вы действительно хотите удалить?'}
                    onConfirm={() => deleteClient(record.id)}
                  >
                    <Button type={'primary'} danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Tooltip>
              </ButtonGroup>
            );
          },
        },
      ]}
    />
  );
};
