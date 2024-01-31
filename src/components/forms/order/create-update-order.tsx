'use client';
import React from 'react';
import { Button, Form, InputNumber, Select, Tag } from 'antd';
import { useGetClientsQuery } from '@/redux/api/client';
import debounce from 'lodash.debounce';
import { IClient } from '@/redux/api/client/types';
import { ICreateUpdateOrderFormProps } from '@/components/forms/order/types';
import { ICar } from '@/redux/api/car/types';
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from '@/redux/api/order';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { OrderStatusColor, OrderStatusName } from '@/enums/order-status';
import { ActionTypes } from '@/enums/action-types';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import { useFormValidate } from '@/hooks/useFormValidate';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';

export const CreateUpdateOrderForm: React.FC<ICreateUpdateOrderFormProps> = ({
  actionType,
  initialValues,
}) => {
  const { data: clients } = useGetClientsQuery({});
  const [clientsData, setClientsData] = React.useState<IClient[] | any>([]);
  const [carsData, setCarsData] = React.useState<any>([]);
  const [updateOrder] = useUpdateOrderMutation();
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);

  React.useEffect(() => {
    clients && setClientsData(clients?.data);
  }, [clients]);

  const onSearchClient = debounce((value: string) => {
    const clientsFiltered = clients?.data.filter(
      (client: IClient) =>
        client.first_name.includes(value) || client.last_name.includes(value),
    );
    setClientsData(clientsFiltered);
  }, 300);

  const onSelectClient = (value: string) => {
    const cars = clients?.data?.find((client: IClient) => client.id === value)
      ?.cars;
    setCarsData(cars);
    form.setFieldValue('car_id', '');
  };

  const onSubmit = async (values: any) => {
    if (actionType === ActionTypes.ADD) {
      await createOrder(values);
    } else {
      await updateOrder({
        id: initialValues?.id,
        payload: values,
      });
    }
    dispatch(closeModal());
  };

  return (
    <Form
      initialValues={initialValues}
      layout={'vertical'}
      onFinish={onSubmit}
      form={form}
      onValuesChange={validate}
    >
      <Form.Item
        label={'Клиент'}
        name={'client_id'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Select onSearch={onSearchClient} onSelect={onSelectClient}>
          {clientsData.length &&
            clientsData.map((client: IClient) => (
              <Select.Option key={client.id}>
                {client.first_name} {client.last_name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={'Авто'}
        name={'car_id'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Select>
          {carsData.length &&
            carsData.map((car: ICar) => (
              <Select.Option key={car.id}>
                {car.brand} {car.model} {car.year} | {car.car_number}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={'Описание'}
        name={'description'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label={'Пробег'}
        name={'odometer'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <InputNumber className={'w-full'} />
      </Form.Item>
      {actionType !== ActionTypes.ADD && (
        <Form.Item label={'Статус заказа'} name={'status'}>
          <Select>
            {Object.keys(OrderStatusName).map((statusName: string) => (
              <Select.Option key={statusName}>
                <Tag className={OrderStatusColor[statusName]}>
                  {OrderStatusName[statusName]}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Button type={'primary'} htmlType={'submit'} disabled={isErrors}>
        Сохранить
      </Button>
    </Form>
  );
};
