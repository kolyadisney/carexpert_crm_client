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
  Table,
  TableColumnProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useDeleteCarMutation, useGetCarByIdQuery } from '@/redux/api/car';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { useAppDispatch } from '@/redux/hook';
import { ActionTypes } from '@/enums/action-types';
import { routes } from '@/routes';
import { IOrder } from '@/redux/api/order/types';
import dayjs from 'dayjs';
import {
  OrderStatus,
  OrderStatusColor,
  OrderStatusName,
} from '@/enums/order-status';

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
  const columns: TableColumnProps<IOrder>[] = [
    {
      title: 'Дата',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at: string) => dayjs(created_at).format('DD.MM.YYYY'),
    },
    {
      title: 'Описание',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Статус заказа',
      key: 'status',
      dataIndex: 'status',
      render: (status: OrderStatus) => (
        <Tag className={OrderStatusColor[status]}>
          {OrderStatusName[status]}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: string) => (
        <Tooltip placement={'top'} title={'Просмотреть'}>
          <Button
            type={'primary'}
            icon={<EyeOutlined />}
            onClick={() => router.push(routes['order'].link(id))}
            size={'small'}
          />
        </Tooltip>
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
          <Col span={24}>
            <Typography.Title level={4}>Заказы</Typography.Title>
            <Table columns={columns} size={'small'} dataSource={car?.orders} />
          </Col>
        </Row>
      </Skeleton>
    </Box>
  );
};

export default CarPage;
