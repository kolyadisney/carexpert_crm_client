import React from 'react';
import { IComponentOwnProps } from '@/components/forms/service/types';
import { Button, Form, Input, notification } from 'antd';
import { ICreateServicePayload } from '@/redux/api/service/types';
import { useCreateServiceMutation } from '@/redux/api/service';
import { ServiceCategoryAutocomplete } from '@/components';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { useFormValidate } from '@/hooks/useFormValidate';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';

export const CreateEditServiceForm: React.FC<IComponentOwnProps> = ({
  categoryName,
}) => {
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);
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
    <Form
      layout={'vertical'}
      onFinish={onSubmit}
      form={form}
      onValuesChange={validate}
    >
      <ServiceCategoryAutocomplete
        form={form}
        label={'Категория'}
        name={'category_name'}
        initialCategoryName={categoryName}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      />
      <Form.Item
        name={'name'}
        label={'Название услуги'}
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
        name={'priceForSedan'}
        label={'Цена для легкового'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'number'} allowClear />
      </Form.Item>
      <Form.Item
        name={'priceForSuv'}
        label={'Цена для внедорожника'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'number'} allowClear />
      </Form.Item>
      <Form.Item
        name={'priceForMinivan'}
        label={'Цена для микроавтобуса'}
        rules={[
          {
            required: true,
            message: VALIDATION_MESSAGE.REQUIRED,
          },
        ]}
      >
        <Input type={'number'} allowClear />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'} disabled={isErrors}>
        Сохранить
      </Button>
    </Form>
  );
};
