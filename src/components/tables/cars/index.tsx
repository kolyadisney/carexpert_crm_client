'use client';
import { Button, Popconfirm, Table, Tooltip } from 'antd';

import React from 'react';
import { IComponentOwnProps } from '@/components/tables/cars/types';
import { Truncate } from '@/components';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ButtonGroup from 'antd/es/button/button-group';
import { useRouter } from 'next/navigation';
import {
  makeTableFilters,
  makeTablePagination,
} from '@/components/tables/config';
import { TABLE_NAME } from '@/components/tables/clients/config';
import { routes } from '@/routes';
import { setCarFilters } from '@/redux/slice/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useDeleteCarMutation } from '@/redux/api/car';
import dayjs from 'dayjs';

export const TableCars: React.FC<IComponentOwnProps> = ({
  loading,
  data,
  meta,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.carFilters);
  const [deleteCar, { isLoading }] = useDeleteCarMutation();
  return (
    <Table
      loading={loading}
      dataSource={data}
      size={'small'}
      pagination={makeTablePagination(TABLE_NAME, {
        current: filters.page,
        defaultPageSize: filters.limit,
        total: meta?.total,
      })}
      onChange={(pagination: any, filters: any, sorter: any) => {
        dispatch(setCarFilters(makeTableFilters(pagination, filters, sorter)));
      }}
      columns={[
        {
          title: 'Номер авто',
          dataIndex: 'car_number',
          render: (car_number: string) => (
            <Truncate type={'text'} copy={car_number}>
              {car_number}
            </Truncate>
          ),
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          render: (vin: string) => (
            <Truncate type={'text'} copy={vin}>
              {vin}
            </Truncate>
          ),
        },
        {
          title: 'Марка',
          dataIndex: 'brand',
        },
        {
          title: 'Модель',
          dataIndex: 'model',
        },
        {
          title: 'Год выпуска',
          dataIndex: 'year',
          sorter: true,
        },
        {
          title: 'Цвет',
          dataIndex: 'color',
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
          render: (_: any, record) => (
            <ButtonGroup size={'small'}>
              <Tooltip placement={'top'} title={'Просмотреть'}>
                <Button
                  type={'primary'}
                  icon={<EyeOutlined />}
                  onClick={() => router.push(routes['car'].link(record.id))}
                />
              </Tooltip>
              <Tooltip placement={'top'} title={'Удалить'}>
                <Popconfirm
                  title={'Вы действительно хотите удалить?'}
                  onConfirm={() => deleteCar(record.id)}
                >
                  <Button
                    type={'primary'}
                    danger
                    loading={isLoading}
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Tooltip>
            </ButtonGroup>
          ),
        },
      ]}
    />
  );
};
