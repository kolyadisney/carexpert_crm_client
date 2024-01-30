import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { IComponentOwnProps } from '@/components/forms/service/types';
import { ActionTypes } from '@/enums/action-types';
import {
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
} from '@/redux/api/service';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';

export const CreateEditServiceCategoryForm: React.FC<IComponentOwnProps> = ({
  actionType,
  initialValues,
}) => {
  const [form] = useForm();
  const [createCategory, { isLoading }] = useCreateServiceCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateServiceCategoryMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: any) => {
    if (actionType === ActionTypes.ADD) {
      await createCategory(values.name);
      dispatch(closeModal());
      notification.success({
        message: 'Категория успешно создана',
      });
    } else {
      updateCategory({
        name: values.name,
        id: initialValues.id,
      });
      dispatch(closeModal());
      notification.success({
        message: 'Категория успешно обновлена',
      });
    }
  };
  return (
    <Form
      form={form}
      layout={'vertical'}
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name={'name'}>
        <Input type={'text'} />
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
