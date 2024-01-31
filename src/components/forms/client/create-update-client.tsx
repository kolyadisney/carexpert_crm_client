import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from '@/redux/api/client';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { ICreateClientPayload } from '@/redux/api/client/types';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';
import { IComponentOwnProps } from '@/components/forms/client/types';
import { ActionTypes } from '@/enums/action-types';
import { useForm } from 'antd/es/form/Form';
import { useFormValidate } from '@/hooks/useFormValidate';

export const CreateUpdateClientForm: React.FC<IComponentOwnProps> = ({
  initialValues,
  actionType,
}) => {
  const [createClient, { isLoading }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);
  const dispatch = useAppDispatch();
  const onSubmit = async (payload: ICreateClientPayload) => {
    try {
      if (actionType === ActionTypes.ADD) {
        await createClient(payload);
        notification.success({
          message: 'Клиент успешно создан',
        });
      }
      if (actionType === ActionTypes.EDIT) {
        await updateClient({ payload, id: initialValues?.id! });
        notification.success({
          message: 'Клиент успешно обновлен',
        });
      }
      dispatch(closeModal());
    } catch {}
  };
  return (
    <Form
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={initialValues}
      form={form}
      onValuesChange={validate}
    >
      <Form.Item
        label={'Имя'}
        name={'first_name'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'text'} size={'middle'} bordered allowClear />
      </Form.Item>
      <Form.Item
        label={'Фамилия'}
        name={'last_name'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'text'} size={'middle'} bordered allowClear />
      </Form.Item>
      <Form.Item
        label={'Номер телефона'}
        name={'phone'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
          {
            pattern: /\+380\d{9}/,
            message:
              'Введите корректный номер телефона в формате +380935555555',
          },
        ]}
      >
        <Input type={'phone'} size={'middle'} bordered allowClear />
      </Form.Item>
      <Form.Item
        label={'Ел. почта'}
        name={'email'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
          {
            type: 'email',
            message: 'Введите корректную ел.почту',
          },
        ]}
      >
        <Input type={'email'} size={'middle'} bordered allowClear />
      </Form.Item>
      <Button
        type={'primary'}
        htmlType={'submit'}
        loading={isLoading || isUpdating}
        disabled={isErrors}
      >
        Сохранить
      </Button>
    </Form>
  );
};
