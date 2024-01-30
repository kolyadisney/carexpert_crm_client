'use client';
import React from 'react';
import { TableCars } from '@/components/tables/cars';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { Col, Row } from 'antd';
import { CarTableFilter } from '@/components/forms/tables-filters/car-table-filter';
import { ReloadOutlined } from '@ant-design/icons';
import { EModalsMap } from '@/components/modals/config';
import { useGetCarsQuery } from '@/redux/api/car';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { openModal } from '@/redux/slice/modalSlice';
import { routes } from '@/routes';

const CarsPage = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.carFilters);
  const { data, isLoading, isFetching, refetch } = useGetCarsQuery(filters);
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
        text: 'Добавить авто',
        type: 'primary',
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_CAR,
              modalProps: {
                title: 'Добавить авто',
                withClientField: true,
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
          title={routes['cars'].name()}
          actions={pageHeadingActions}
        />
        <Row>
          <Col span={8}>
            <CarTableFilter />
          </Col>
          <Col span={24}>
            <TableCars
              data={data?.data || []}
              meta={data?.meta}
              loading={isLoading || isFetching}
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default CarsPage;
