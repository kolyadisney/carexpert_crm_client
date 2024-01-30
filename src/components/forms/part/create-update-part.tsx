import React from 'react';
import { Button, Form, Input, InputNumber, Select, Tag } from 'antd';
import { ICreateUpdatePartFormProps } from '@/components/forms/part/types';
import { useCreatePartMutation } from '@/redux/api/part';
import { ICreatePartPayload } from '@/redux/api/part/types';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import {
  PartStatus,
  PartStatusColor,
  PartStatusName,
} from '@/enums/part-status';

export const CreateUpdatePartFrom: React.FC<ICreateUpdatePartFormProps> = ({
  initialValues,
  part_id,
}) => {
  const dispatch = useAppDispatch();
  const [createPart] = useCreatePartMutation();
  const onSubmit = async (values: ICreatePartPayload) => {
    await createPart(values);
    dispatch(closeModal());
  };
  return (
    <Form initialValues={initialValues} layout={'vertical'} onFinish={onSubmit}>
      <Form.Item label={'Название'} name={'name'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Бренд'} name={'brand'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Поставщик'} name={'supplier'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Код запчасти'} name={'code'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Кол-во шт.'} name={'quantity'}>
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
      <Form.Item label={'Цена'} name={'price'}>
        <InputNumber className={'w-full'} />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'}>
        Сохранить
      </Button>
    </Form>
  );
};
