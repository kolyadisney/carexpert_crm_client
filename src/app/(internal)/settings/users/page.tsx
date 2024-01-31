'use client';
import React from 'react';
import { Table, Tag } from 'antd';
import { useGetAllUsersQuery } from '@/redux/api/user';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { makeTablePagination } from '@/components/tables/config';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { routes } from '@/routes';
import { IUser } from '@/redux/types';
import { UserRole, UserRoleColors, UserRoleNames } from '@/enums/roles';
import { ReloadOutlined } from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';

const UsersPage = () => {
  const filters = useAppSelector((state) => state.filters.userFilters);
  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(filters);
  const dispatch = useAppDispatch();
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
        text: 'Добавить пользователя',
        type: 'primary',
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_USER,
              modalProps: {
                title: 'Добавить пользователя',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
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
      render: (role: UserRole) => (
        <Tag className={UserRoleColors[role]}>{UserRoleNames[role]}</Tag>
      ),
    },
  ];
  return (
    <Box>
      <PageHeading
        title={routes['users'].name()}
        actions={pageHeadingActions}
      />
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
