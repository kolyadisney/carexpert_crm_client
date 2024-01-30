'use client';
import React from 'react';
import { TableClients } from '@/components/tables';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { ClientTableFilter } from '@/components/forms/tables-filters/clients-table-filter';
import { Col, Row } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { EModalsMap } from '@/components/modals/config';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { openModal } from '@/redux/slice/modalSlice';
import { useGetClientsQuery } from '@/redux/api/client';
import { routes } from '@/routes';
import { ActionTypes } from '@/enums/action-types';

const ClientsPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.clientFilters);
  const { data, isLoading, refetch } = useGetClientsQuery(filters);

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
        loading: isLoading,
        onClick: () => refetch(),
      },
    },
    {
      button: {
        text: 'Добавить клиента',
        type: 'primary',
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_CLIENT,
              modalProps: {
                title: 'Добавить клиента',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
  return (
    <>
      <Box>
        <PageHeading
          title={routes['clients'].name()}
          actions={pageHeadingActions}
        />
        <Row>
          <Col span={8}>
            <ClientTableFilter />
          </Col>
          <Col span={24}>
            <TableClients
              data={data?.data || []}
              meta={data?.meta}
              loading={isLoading}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default ClientsPage;
