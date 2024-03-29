import React from 'react';
import { Button, Form, Input, InputNumber, Select, Tag } from 'antd';
import { ICreateUpdatePartFormProps } from '@/components/forms/part/types';
import { useCreatePartMutation, useUpdatePartMutation } from '@/redux/api/part';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import {
  PartStatus,
  PartStatusColor,
  PartStatusName,
} from '@/enums/part-status';
import { useForm } from 'antd/es/form/Form';
import { useFormValidate } from '@/hooks/useFormValidate';
import { ActionTypes } from '@/enums/action-types';
import { VALIDATION_MESSAGE } from '@/enums/validation-messages';

export const CreateUpdatePartFrom: React.FC<ICreateUpdatePartFormProps> = ({
  initialValues,
  actionType,
}) => {
  const [form] = useForm();
  const { validate, isErrors } = useFormValidate(form);
  const dispatch = useAppDispatch();
  const [createPart] = useCreatePartMutation();
  const [updatePart] = useUpdatePartMutation();
  const onSubmit = async (values: any) => {
    if (actionType === ActionTypes.ADD) {
      await createPart(values);
    }
    if (actionType === ActionTypes.EDIT) {
      await updatePart({
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
        label={'Название'}
        name={'name'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Бренд'}
        name={'brand'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Поставщик'}
        name={'supplier'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Код запчасти'}
        name={'code'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <Input type={'text'} allowClear />
      </Form.Item>
      <Form.Item
        label={'Кол-во шт.'}
        name={'quantity'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <InputNumber className={'w-full'} />
      </Form.Item>
      <Form.Item label={'Наличие'} name={'status'}>
        <Select defaultValue={PartStatus.IN_STOCK}>
          {Object.keys(PartStatusName).map((statusName: string) => (
            <Select.Option key={statusName}>
              <Tag className={PartStatusColor[statusName]}>
                {PartStatusName[statusName]}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={'Цена'}
        name={'price'}
        rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
      >
        <InputNumber className={'w-full'} />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'} disabled={isErrors}>
        Сохранить
      </Button>
    </Form>
  );
};
