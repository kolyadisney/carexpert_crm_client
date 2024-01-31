'use client';
import React from 'react';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { Button, Col, Popconfirm, Row, Table, Tag, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { routes } from '@/routes';
import { useDeletePartMutation, useGetAllPartsQuery } from '@/redux/api/part';
import { IClient } from '@/redux/api/client/types';
import { PartStatusColor, PartStatusName } from '@/enums/part-status';
import { PartTableFilter } from '@/components/forms/tables-filters/part-table-filter';
import {
  makeTableFilters,
  makeTablePagination,
} from '@/components/tables/config';
import { TABLE_NAME } from '@/components/tables/clients/config';
import { setPartFilters } from '@/redux/slice/filtersSlice';
import dayjs from 'dayjs';

const PartsPage = () => {
  const filters = useAppSelector((state) => state.filters.partFilters);
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, refetch } = useGetAllPartsQuery(filters);
  const [deletePart, { isLoading: isDeleting }] = useDeletePartMutation();
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
        text: 'Добавить запчасть',
        type: 'primary',
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_PART,
              modalProps: {
                title: 'Добавить запчасть',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
  const columns: any = [
    {
      title: 'Дата',
      sorter: true,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => dayjs(created_at).format('DD.MM.YYYY'),
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Код запчасти',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Кол-во, шт.',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Наличие',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        return (
          <Tag className={PartStatusColor[status]}>
            {PartStatusName[status]}
          </Tag>
        );
      },
    },
    {
      title: 'Цена вход, грн',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Цена выход, грн',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => {
        return price * 1.3;
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: IClient) => {
        return (
          <>
            <Tooltip placement={'top'} title={'Редактировать'}>
              <Button
                type={'primary'}
                icon={<EditOutlined />}
                style={{ margin: '0 8px' }}
                size={'small'}
                onClick={() =>
                  dispatch(
                    openModal({
                      name: EModalsMap.CREATE_UPDATE_PART,
                      modalProps: {
                        title: 'Редактирование запчасть',
                        actionType: ActionTypes.EDIT,
                        initialValues: record,
                      },
                    }),
                  )
                }
              />
            </Tooltip>
            <Tooltip placement={'top'} title={'Удалить'}>
              <Popconfirm
                title={'Вы действительно хотите удалить?'}
                onConfirm={() => deletePart(record.id)}
              >
                <Button
                  type={'primary'}
                  danger
                  icon={<DeleteOutlined />}
                  size={'small'}
                />
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
  ];
  return (
    <Box>
      <PageHeading
        title={routes['parts'].name()}
        actions={pageHeadingActions}
      />
      <Row>
        <Col span={8}>
          <PartTableFilter />
        </Col>
      </Row>
      <Table
        size={'small'}
        dataSource={data?.data || []}
        columns={columns}
        loading={isLoading || isFetching || isDeleting}
        pagination={makeTablePagination(TABLE_NAME, {
          current: filters.page,
          defaultPageSize: filters.limit,
          total: data?.meta?.total,
        })}
        onChange={(pagination: any, filters: any, sorter: any) => {
          dispatch(
            setPartFilters(makeTableFilters(pagination, filters, sorter)),
          );
        }}
      />
    </Box>
  );
};

export default PartsPage;
