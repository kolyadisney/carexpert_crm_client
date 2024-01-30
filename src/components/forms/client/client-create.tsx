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

export const CreateClientForm: React.FC<IComponentOwnProps> = ({
  initialValues,
  actionType,
}) => {
  const [createClient, { isLoading }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (payload: ICreateClientPayload) => {
    try {
      if (actionType === ActionTypes.ADD) {
        await createClient(payload);
        notification.success({
          message: 'Клиент успешно создан',
        });
      } else {
        await updateClient({ payload, id: initialValues?.id! });
        notification.success({
          message: 'Клиент успешно обновлен',
        });
      }
      dispatch(closeModal());
    } catch {}
    dispatch(closeModal());
  };
  return (
    <Form layout={'vertical'} onFinish={onSubmit} initialValues={initialValues}>
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
        <Input type={'text'} size={'middle'} bordered />
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
        <Input type={'text'} size={'middle'} bordered />
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
        <Input type={'phone'} size={'middle'} bordered />
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
        <Input type={'email'} size={'middle'} bordered />
      </Form.Item>
      <Button
        type={'primary'}
        htmlType={'submit'}
        loading={isLoading || isUpdating}
      >
        Сохранить
      </Button>
    </Form>
  );
};
