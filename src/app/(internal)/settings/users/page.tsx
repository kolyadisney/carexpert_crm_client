'use client';
import React from 'react';
import { Table } from 'antd';
import { useGetAllUsersQuery } from '@/redux/api/user';
import { useAppSelector } from '@/redux/hook';
import { makeTablePagination } from '@/components/tables/config';
import { Box, PageHeading } from '@/components';
import { routes } from '@/routes';
import { IUser } from '@/redux/types';

const UsersPage = () => {
  const filters = useAppSelector((state) => state.filters.userFilters);
  const { data: users, isLoading, isFetching } = useGetAllUsersQuery(filters);
  const columns: any = [
    {
      title: '№',
      width: '50px',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'ФИО',
      dataIndex: 'first_name',
      key: 'id',
      render: (_: any, record: IUser) => {
        return `${record.first_name} ${record.last_name}`;
      },
    },
    {
      title: 'Ел. почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
  ];
  return (
    <Box>
      <PageHeading title={routes['users'].name()} />
      <Table
        loading={isLoading || isFetching}
        dataSource={users?.data || []}
        columns={columns}
        pagination={makeTablePagination('users', {
          current: filters.page,
          defaultPageSize: filters.limit,
          total: users?.meta?.total,
        })}
      >
        Settings
      </Table>
    </Box>
  );
};

export default UsersPage;
