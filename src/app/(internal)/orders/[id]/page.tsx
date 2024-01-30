'use client';
import React from 'react';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { routes } from '@/routes';
import { useParams } from 'next/navigation';
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Row,
  Skeleton,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useGetOrderByIdQuery } from '@/redux/api/order';
import { IOrderPart, IOrderService } from '@/redux/api/order/types';
import { IService, IServicePrice } from '@/redux/api/service/types';
import { OrderStatusColor, OrderStatusName } from '@/enums/order-status';
import {
  EditOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { useAppDispatch } from '@/redux/hook';
import { CarTypeName } from '@/enums/car-type';
import Link from 'next/link';
import { ActionTypes } from '@/enums/action-types';
import dayjs from 'dayjs';
import { IPart } from '@/redux/api/part/types';

const OrderPage = () => {
  const params = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(Number(params.id));
  const dispatch = useAppDispatch();

  const items: DescriptionsProps['items'] = [
    {
      key: 'client',
      label: 'Клиент',
      children: (
        <Link href={routes['client'].link(order?.client_id)}>
          {order?.client.first_name} {order?.client.last_name}
        </Link>
      ),
    },
    {
      key: 'car',
      label: 'Авто',
      children: (
        <Link href={routes['car'].link(order?.car_id)}>
          {order?.car.brand} {order?.car.model} {order?.car.year}{' '}
          {order?.car.color}
        </Link>
      ),
    },
    {
      key: 'vin',
      label: 'VIN',
      children: `${order?.car.vin}`,
    },
    {
      key: 'odometer',
      label: 'Пробег',
      children: `${order?.odometer} км`,
    },
    {
      key: 'car_type',
      label: 'Тип авто',
      children: CarTypeName[order?.car.car_type || 'SEDAN'],
    },
    {
      key: 'status',
      label: 'Статус заказа',
      children: order && order.status && (
        <Tag className={OrderStatusColor[order.status]}>
          {OrderStatusName[order.status]}
        </Tag>
      ),
    },
  ];

  const orderServiceTotalPrice = order?.order_services.reduce(
    (acc: number, order_service: IOrderService) => {
      const price =
        order_service.service.prices.find(
          (price: IServicePrice) => price.carType === order?.car.car_type,
        )?.price || 0;
      return (acc += price);
    },
    0,
  );

  const orderPartsTotalPrice = order?.order_car_parts.reduce(
    (acc: number, order_car_part: IOrderPart) => {
      const price = order_car_part.car_part.price * 1.3 || 0;
      return (acc += price);
    },
    0,
  );

  const totalOrderPrice =
    Number(orderPartsTotalPrice) + Number(orderServiceTotalPrice);

  const payload = {
    order_id: String(order?.id),
    order_date: dayjs(order?.created_at).format('DD.MM.YYYY'),
    invoice_date: dayjs().format('DD.MM.YYYY'),
    service_total: orderServiceTotalPrice,
    car_part_total: orderPartsTotalPrice,
    total: totalOrderPrice,
    client: {
      first_name: order?.client?.first_name,
      last_name: order?.client?.last_name,
    },
    car: {
      car_number: order?.car?.car_number,
      brand: order?.car?.brand,
      model: order?.car?.model,
      year: order?.car?.year,
      vin: order?.car?.vin,
    },
    services: order?.order_services.map((service: IOrderService) => ({
      name: service?.service?.name,
      price: service?.service?.prices.find(
        (price: IServicePrice) => price.carType === order?.car?.car_type,
      )?.price,
    })),
    car_parts: order?.order_car_parts.map((order_car_part: IOrderPart) => ({
      name: order_car_part.car_part.name,
      brand: order_car_part.car_part.brand,
      supplier: order_car_part.car_part.supplier,
      code: order_car_part.car_part.code,
      quantity: order_car_part.quantity,
      price: order_car_part.car_part.price,
    })),
  };

  const pageHeadingActions = [
    {
      button: {
        text: 'Услуги',
        type: 'dashed',
        icon: <PlusOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_ORDER_SERVICES,
              modalProps: {
                title: 'Добавить услуги',
                order_id: order?.id,
                initialValues: order?.order_services,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Запчасти',
        type: 'dashed',
        icon: <PlusOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_ORDER_PARTS,
              modalProps: {
                title: 'Добавить запчасти',
                order_id: order?.id,
                initialValues: order?.order_car_parts,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Редактировать заказ',
        type: 'primary',
        icon: <EditOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_ORDER,
              modalProps: {
                title: 'Добавить услуги',
                actionType: ActionTypes.EDIT,
                initialValues: order,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Счет',
        type: 'primary',
        icon: <MoneyCollectOutlined />,
        onClick: async () => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_WEB_API_URL}/pdf/order`,
            {
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json',
              },
              keepalive: true,
            },
          );
          const blob = await res.blob();

          // Здесь вы можете обработать blob, например, отобразить его в окне браузера или сохранить на диск
          const url = URL.createObjectURL(blob);
          window.open(url);
        },
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
  const columnsServices: any = [
    {
      title: '№',
      width: '50px',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Название услуги',
      dataIndex: 'service_name',
      render: (_: any, record: IOrderService) => {
        return record.service.name;
      },
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      render: (_: any, record: IOrderService) => {
        return record.service.prices.find(
          (price: IServicePrice) => price.carType === order?.car.car_type,
        )?.price;
      },
    },
  ];

  const columnsParts: any = [
    {
      title: '№',
      width: '50px',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: IOrderPart) => record?.car_part?.name,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
      render: (_: any, record: IOrderPart) => record?.car_part?.brand,
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (_: any, record: IOrderPart) => record?.car_part?.supplier,
    },
    {
      title: 'Код запчасти',
      dataIndex: 'code',
      key: 'code',
      render: (_: any, record: IOrderPart) => record?.car_part?.code,
    },
    {
      title: 'Кол-во, шт.',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, record: IOrderPart) => record?.quantity,
    },
    {
      title: 'Цена вход, грн',
      dataIndex: 'price',
      key: 'price',
      render: (_: any, record: IOrderPart) => record?.car_part?.price,
    },
    {
      title: 'Цена выход, грн',
      dataIndex: 'price',
      key: 'price',
      render: (_: any, record: IOrderPart) => record?.car_part?.price * 1.3,
    },
  ];

  return (
    <Box>
      <Skeleton loading={isLoading}>
        <PageHeading
          title={routes['order'].name(order?.id)}
          actions={pageHeadingActions}
        />
        <Row>
          <Col span={24} xs={24} sm={8}>
            <Descriptions
              title={'Заказчик'}
              items={items}
              bordered={true}
              column={1}
              size={'small'}
              className={'mb-14'}
            />
          </Col>
        </Row>
        <Typography.Title level={4} className={'!text-base font-bold'}>
          Список услуг
        </Typography.Title>
        <Table
          loading={isLoading}
          columns={columnsServices}
          dataSource={order?.order_services}
          bordered
          size={'small'}
          pagination={false}
        />
        <Row className={'flex items-end justify-end mt-6'}>
          <Typography.Title level={4} className={'!m-0 !mr-2 font-normal'}>
            Всего за услуги:
          </Typography.Title>
          <Typography.Title level={3} className={'!m-0'}>
            {orderServiceTotalPrice} грн
          </Typography.Title>
        </Row>
        <Typography.Title level={4} className={'!text-base font-bold'}>
          Список запчастей
        </Typography.Title>
        <Table
          loading={isLoading}
          columns={columnsParts}
          dataSource={order?.order_car_parts}
          bordered
          size={'small'}
          pagination={false}
        />
        <Row className={'flex items-end justify-end mt-6'}>
          <Typography.Title level={4} className={'!m-0 !mr-2 font-normal'}>
            Всего за запчасти:
          </Typography.Title>
          <Typography.Title level={3} className={'!m-0'}>
            {orderPartsTotalPrice} грн
          </Typography.Title>
        </Row>
        <Divider className={'my-14'} />
        <div className={'flex items-end justify-end'}>
          <Typography.Title level={4} className={'!m-0 !mr-2 font-normal'}>
            Всего за заказ:
          </Typography.Title>
          <Typography.Title level={2} className={'!m-0'}>
            {totalOrderPrice} грн
          </Typography.Title>
        </div>
      </Skeleton>
    </Box>
  );
};

export default OrderPage;
