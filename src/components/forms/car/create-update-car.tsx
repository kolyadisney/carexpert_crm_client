'use client';
import React from 'react';
import { Button, Form, Input, notification, Select } from 'antd';
import {
  BrandsAutocomplete,
  ClientsAutocomplete,
  ModelsAutocomplete,
} from '@/components';
import { useForm } from 'antd/es/form/Form';
import { useCreateCarMutation, useUpdateCarMutation } from '@/redux/api/car';
import { ICreateCarPayload } from '@/redux/api/car/types';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { ActionTypes } from '@/enums/action-types';
import { CarTypeName } from '@/enums/car-type';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';
import { useFormValidate } from '@/hooks/useFormValidate';

export const CreateUpdateCar: React.FC<any> = ({
  client_id,
  withClientField,
  initialValues,
  actionType,
}) => {
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);
  const [createCar, { isLoading }] = useCreateCarMutation();
  const [updateCar, { isLoading: isUpdatingCar }] = useUpdateCarMutation();
  const modalPrivateData = useAppSelector((state) => state.modal.privateData);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: ICreateCarPayload) => {
    const payload = {
      ...values,
      client_id: modalPrivateData?.client_id || client_id,
    };
    try {
      if (actionType === ActionTypes.ADD) {
        await createCar(payload);
        notification.success({
          message: 'Авто успешно добавлен',
        });
      }
      if (actionType === ActionTypes.EDIT) {
        notification.success({
          message: 'Авто успешно обновлен',
        });
        await updateCar({ payload, id: initialValues?.id });
      }
      dispatch(closeModal());
    } catch (error) {}
  };

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={initialValues}
      onValuesChange={validate}
    >
      <Form.Item
        label={'Номер авто'}
        name={'car_number'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'VIN'}
        name={'vin'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
          {
            min: 17,
            message: 'Поле должно содержать не менее 17 символов',
          },
          {
            max: 17,
            message: 'Поле должно содержать не более 17 символов',
          },
        ]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <BrandsAutocomplete
        form={form}
        label={'Марка авто'}
        name={'brand'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      />
      <ModelsAutocomplete
        form={form}
        label={'Модель авто'}
        name={'model'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      />
      <Form.Item
        label={'Тип авто'}
        name={'car_type'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Select>
          {Object.keys(CarTypeName).map((type: string) => (
            <Select.Option key={type}>{CarTypeName[type]}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={'Год выпуска'}
        name={'year'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Цвет'}
        name={'color'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      {withClientField && (
        <ClientsAutocomplete
          form={form}
          label={'Клиент'}
          name={'client_id'}
          rules={[
            {
              required: true,
              message: VALIDATION_MESSAGE.REQUIRED,
            },
          ]}
        />
      )}
      <Button
        type={'primary'}
        htmlType={'submit'}
        loading={isLoading || isUpdatingCar}
        disabled={isErrors}
      >
        Сохранить
      </Button>
    </Form>
  );
};
