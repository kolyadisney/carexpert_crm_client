'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, IPageHeadingAction, PageHeading, Truncate } from '@/components';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  DescriptionsProps,
  Popconfirm,
  Row,
  Skeleton,
  Tooltip,
} from 'antd';
import { EModalsMap } from '@/components/modals/config';
import {
  useDeleteClientMutation,
  useGetClientByIdQuery,
} from '@/redux/api/client';
import { useAppDispatch } from '@/redux/hook';
import { openModal } from '@/redux/slice/modalSlice';
import { ICar } from '@/redux/api/car/types';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useDeleteCarMutation } from '@/redux/api/car';
import { ActionTypes } from '@/enums/action-types';
import { routes } from '@/routes';

const ClientPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    data: client,
    isLoading,
    refetch,
  } = useGetClientByIdQuery(params?.id as string);
  const router = useRouter();
  const [deleteCar, { isLoading: isDeletingCar }] = useDeleteCarMutation();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();
  const pageHeadingActions = [
    {
      button: {
        text: 'Добавить авто',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_CAR,
              modalProps: {
                title: 'Добавить авто',
                client_id: params?.id,
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Редактировать клиента',
        type: 'primary',
        icon: <EditOutlined />,
        ghost: true,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.UPDATE_CREATE_CLIENT,
              modalProps: {
                title: 'Добавить авто',
                initialValues: client,
                actionType: ActionTypes.EDIT,
              },
            }),
          ),
      },
    },
    {
      button: {
        text: 'Удалить клиента',
        type: 'primary',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => deleteClient(client?.id!),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];

  const items: DescriptionsProps['items'] = [
    {
      key: 'email',
      label: 'E-mail',
      children: (
        <Truncate type={'text'} copy={client?.email}>
          {client?.email}
        </Truncate>
      ),
    },
    {
      key: 'phone',
      label: 'Телефон',
      children: (
        <Truncate type={'text'} copy={client?.phone}>
          {client?.phone}
        </Truncate>
      ),
    },
  ];

  const renderCarActionButtons = React.useCallback(
    (car: ICar) => {
      return (
        <div>
          <Badge size={'small'} count={car?.orders?.length}>
            <Tooltip title={'Заказы'}>
              <Button
                type={'default'}
                size={'small'}
                icon={<UnorderedListOutlined />}
                onClick={() => router.push(routes['car'].link(car.id))}
              />
            </Tooltip>
          </Badge>
          <Tooltip title={'Редактировать'}>
            <Button
              type={'primary'}
              size={'small'}
              icon={<EditOutlined />}
              style={{ margin: '0 8px' }}
              onClick={() =>
                dispatch(
                  openModal({
                    name: EModalsMap.UPDATE_CREATE_CAR,
                    modalProps: {
                      title: 'Редактировать авто',
                      actionType: ActionTypes.EDIT,
                      initialValues: car,
                      client_id: params?.id,
                    },
                  }),
                )
              }
            />
          </Tooltip>
          <Tooltip title={'Удалить'}>
            <Popconfirm
              title={'Вы уверены что хотите удалить?'}
              okText={'Да'}
              cancelText={'Нет'}
              onConfirm={() => {
                deleteCar(car.id);
                refetch();
              }}
            >
              <Button
                type={'primary'}
                danger
                size={'small'}
                icon={<DeleteOutlined />}
                loading={isDeletingCar}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      );
    },
    [openModal],
  );

  return (
    <Box>
      <Skeleton loading={isLoading || isDeleting}>
        <PageHeading
          title={`${client?.first_name} ${client?.last_name}`}
          actions={pageHeadingActions}
        />
        <Row gutter={[15, 15]}>
          <Col span={10}>
            <Descriptions
              items={items}
              bordered={true}
              column={1}
              size={'small'}
            />
          </Col>
          <Col span={12}>
            <Row gutter={[15, 15]}>
              {client?.cars?.map((car: ICar) => (
                <Col span={12} key={car?.id}>
                  <Card
                    title={`${car.year} ${car?.brand} ${car?.model}`}
                    className={'app-car__info-card'}
                    extra={renderCarActionButtons(car)}
                  >
                    <Descriptions
                      bordered
                      layout={'horizontal'}
                      column={1}
                      size={'small'}
                    >
                      <Descriptions.Item label={'Гос. номер'}>
                        <Truncate type={'text'} copy={car?.car_number}>
                          {car?.car_number}
                        </Truncate>
                      </Descriptions.Item>
                      <Descriptions.Item label={'VIN'}>
                        <Truncate type={'text'} copy={car?.vin}>
                          {car?.vin}
                        </Truncate>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Цвет'}>
                        {car?.color}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Skeleton>
    </Box>
  );
};

export default ClientPage;
