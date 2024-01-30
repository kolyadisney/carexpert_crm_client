import React from 'react';
import { IComponentOwnProps } from '@/components/forms/service/types';
import { Button, Form, Input, notification } from 'antd';
import { ICreateServicePayload } from '@/redux/api/service/types';
import { useCreateServiceMutation } from '@/redux/api/service';
import { ServiceCategoryAutocomplete } from '@/components';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';

export const CreateEditServiceForm: React.FC<IComponentOwnProps> = ({
  categoryName,
}) => {
  const [form] = useForm();
  const [createService] = useCreateServiceMutation();
  const dispatch = useAppDispatch();
  const selectedCategoryId = useAppSelector(
    (state) => state.modal.privateData.category_id,
  );
  const onSubmit = async (values: ICreateServicePayload) => {
    try {
      const response: any = await createService({
        ...values,
        category_id: selectedCategoryId,
        priceForSedan: Number(values.priceForSedan),
        priceForSuv: Number(values.priceForSuv),
        priceForMinivan: Number(values.priceForMinivan),
      });
      if (!response.error) {
        dispatch(closeModal());
        notification.success({
          message: 'Услуга успешно добавлена',
        });
      }
    } catch (error) {
      console.log('#error', error);
    }
  };
  return (
    <Form layout={'vertical'} onFinish={onSubmit} form={form}>
      <ServiceCategoryAutocomplete
        form={form}
        label={'Категория'}
        name={'category_name'}
        initialCategoryName={categoryName}
      />
      <Form.Item name={'name'} label={'Название услуги'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item name={'priceForSedan'} label={'Цена для легкового'}>
        <Input type={'number'} />
      </Form.Item>
      <Form.Item name={'priceForSuv'} label={'Цена для внедорожника'}>
        <Input type={'number'} />
      </Form.Item>
      <Form.Item name={'priceForMinivan'} label={'Цена для микроавтобуса'}>
        <Input type={'number'} />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'}>
        Сохранить
      </Button>
    </Form>
  );
};
