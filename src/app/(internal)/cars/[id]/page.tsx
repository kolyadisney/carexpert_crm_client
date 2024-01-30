'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, IPageHeadingAction, PageHeading, Truncate } from '@/components';
import {
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Popconfirm,
  Row,
  Skeleton,
} from 'antd';
import { useDeleteCarMutation, useGetCarByIdQuery } from '@/redux/api/car';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { useAppDispatch } from '@/redux/hook';
import { ActionTypes } from '@/enums/action-types';
import { routes } from '@/routes';

const CarPage = () => {
  const params = useParams();
  const { data: car, isLoading } = useGetCarByIdQuery(params?.id as string);
  const [deleteCar] = useDeleteCarMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pageHeadingActions = [
    {
      button: {
        text: 'Редактировать авто',
        type: 'primary',
        icon: <EditOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_CAR,
              modalProps: {
                title: 'Редактировать авто',
                actionType: ActionTypes.EDIT,
                initialValues: car,
              },
            }),
          ),
      },
    },
    {
      customElement: (
        <Popconfirm
          title={'Вы уверены, что хотите удалить?'}
          onConfirm={async () => {
            await deleteCar(car?.id!);
            router.push(routes['cars'].link());
          }}
        >
          <Button type={'primary'} danger icon={<DeleteOutlined />}>
            Удалить авто
          </Button>
        </Popconfirm>
      ),
    },
  ].filter(Boolean) as IPageHeadingAction[];
  const items: DescriptionsProps['items'] = [
    {
      key: 'email',
      label: 'ФИО',
      children: `${car?.Client?.first_name} ${car?.Client?.last_name}`,
    },
    {
      key: 'email',
      label: 'E-mail',
      children: (
        <Truncate type={'email'} copy={car?.Client?.email}>
          {car?.Client?.email}
        </Truncate>
      ),
    },
    {
      key: 'phone',
      label: 'Телефон',
      children: (
        <Truncate type={'phone'} copy={car?.Client?.phone}>
          {car?.Client?.phone}
        </Truncate>
      ),
    },
  ];
  return (
    <Box>
      <Skeleton loading={isLoading}>
        <PageHeading
          title={`${car?.brand} ${car?.model} ${car?.year} ${car?.color}`}
          actions={pageHeadingActions}
        />
        <Row gutter={[15, 15]}>
          <Col span={8}>
            <Descriptions
              title={'Владелец авто'}
              items={items}
              bordered={true}
              column={1}
              size={'small'}
            />
          </Col>
          <Col span={24}>Заказы</Col>
        </Row>
      </Skeleton>
    </Box>
  );
};

export default CarPage;
