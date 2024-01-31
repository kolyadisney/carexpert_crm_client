import React from 'react';
import { Button, Form, Input, Select, Tag } from 'antd';
import { useUpdatePartMutation } from '@/redux/api/part';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { useForm } from 'antd/es/form/Form';
import { useFormValidate } from '@/hooks/useFormValidate';
import { ActionTypes } from '@/enums/action-types';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';
import { IComponentOwnProps } from '@/components/forms/user/types';
import { UserRole, UserRoleColors, UserRoleNames } from '@/enums/roles';
import { useCreateUserMutation } from '@/redux/api/user';

export const CreateUpdateUserForm: React.FC<IComponentOwnProps> = ({
  initialValues,
  actionType,
}) => {
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);
  const dispatch = useAppDispatch();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdatePartMutation();
  const onSubmit = async (values: any) => {
    if (actionType === ActionTypes.ADD) {
      await createUser(values);
    }
    if (actionType === ActionTypes.EDIT) {
      await updateUser({
        id: initialValues?.id!,
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
        label={'Имя'}
        name={'first_name'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Фамилия'}
        name={'last_name'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Телефон'}
        name={'phone'}
        rules={[
          { required: true, message: VALIDATION_MESSAGE.REQUIRED },
          {
            pattern: /\+380\d{9}/,
            message:
              'Введите корректный номер телефона в формате +380935555555',
          },
        ]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Ел. почта'}
        name={'email'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear autoComplete="random-string" />
      </Form.Item>
      <Form.Item
        label={'Пароль'}
        name={'password'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input.Password allowClear autoComplete="random-string" />
      </Form.Item>
      <Form.Item label={'Имя'} name={'role'} initialValue={UserRole.USER}>
        <Select>
          {Object.keys(UserRoleNames).map((role) => (
            <Select.Option key={role}>
              <Tag className={UserRoleColors[role]} key={role}>
                {UserRoleNames[role]}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'} disabled={isErrors}>
        Сохранить
      </Button>
    </Form>
  );
};
