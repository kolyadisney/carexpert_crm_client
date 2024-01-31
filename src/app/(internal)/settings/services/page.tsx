'use client';
import React from 'react';
import {
  useDeleteServiceCategoryMutation,
  useGetAllServicesWithCategoryQuery,
} from '@/redux/api/service';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { TableServices } from '@/components/tables/services';
import { Button, Collapse, Popconfirm, Skeleton, Tooltip } from 'antd';
import { IServicesWithCategory } from '@/redux/api/service/types';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ServiceFilter } from '@/components/forms/tables-filters/service-filter';
import { routes } from '@/routes';

const ServicesPage = () => {
  const serviceFilters = useAppSelector(
    (state) => state.filters.serviceFilters,
  );
  const { data, isLoading } =
    useGetAllServicesWithCategoryQuery(serviceFilters);
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteServiceCategoryMutation();
  const dispatch = useAppDispatch();

  const pageHeadingActions = [
    {
      button: {
        text: 'Добавить категорию',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_SERVICE_CATEGORY,
              modalProps: {
                title: 'Добавить категорию',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Добавить услугу',
        type: 'primary',
        icon: <PlusCircleOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_SERVICE,
              modalProps: {
                title: 'Добавить услугу',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];

  const renderCategoryButtons = (serviceCategory: IServicesWithCategory) => (
    <>
      <Tooltip title={'Редактировать категорию'}>
        <Button
          type={'primary'}
          size={'small'}
          icon={<EditOutlined />}
          style={{ margin: '0 8px' }}
          onClick={() =>
            dispatch(
              openModal({
                name: EModalsMap.UPDATE_CREATE_SERVICE_CATEGORY,
                modalProps: {
                  title: 'Редактировать категорию',
                  initialValues: serviceCategory,
                  actionType: ActionTypes.EDIT,
                },
              }),
            )
          }
        />
      </Tooltip>
      <Tooltip title={'Удалить категорию'}>
        <Popconfirm
          title={'Вы уверены что хотите удалить?'}
          okText={'Да'}
          cancelText={'Нет'}
          onConfirm={() => deleteCategory(serviceCategory.id)}
        >
          <Button
            type={'primary'}
            danger
            size={'small'}
            icon={<DeleteOutlined />}
            loading={false}
          />
        </Popconfirm>
      </Tooltip>
    </>
  );
  return (
    <Box>
      <PageHeading
        title={routes['services'].name()}
        actions={pageHeadingActions}
      />
      <Skeleton loading={isLoading}>
        <ServiceFilter />
        <Collapse size={'small'}>
          {data?.data.map((servicesCategory: IServicesWithCategory) => (
            <Collapse.Panel
              collapsible={'header'}
              header={servicesCategory?.name}
              key={servicesCategory?.id}
              extra={renderCategoryButtons(servicesCategory)}
            >
              <TableServices
                loading={isLoading}
                data={servicesCategory?.services || []}
                categoryId={servicesCategory?.id}
                categoryName={servicesCategory.name}
                meta={data?.meta}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      </Skeleton>
    </Box>
  );
};

export default ServicesPage;
