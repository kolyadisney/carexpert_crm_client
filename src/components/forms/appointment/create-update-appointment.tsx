import React from 'react';
import { Button, DatePicker, Form, Input, notification } from 'antd';
import dayjs from 'dayjs';
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from '@/redux/api/appointment';
import { useAppDispatch } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';
import { IComponentOwnProps } from '@/components/forms/appointment/types';
import { ActionTypes } from '@/enums/action-types';

export const CreateUpdateAppointmentForm: React.FC<IComponentOwnProps> = ({
  actionType,
  initialValues,
  data,
}) => {
  const [createAppointment] = useCreateAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const dispatch = useAppDispatch();
  const disabledMinutes = () => {
    const minutesToDisabled = [];
    for (let i = 0; i < 60; i++) {
      if (i !== 0) {
        minutesToDisabled.push(i);
      }
    }
    return minutesToDisabled;
  };
  const disabledHours = () => {
    const hoursToDisable = [];
    for (let i = 0; i < 24; i++) {
      if (i < 9 || i >= 18) {
        hoursToDisable.push(i);
      }
    }
    data?.map((item: any) => {
      if (item?.id !== initialValues?.id) {
        hoursToDisable.push(
          Number(dayjs(item.date_time).tz('Europe/Kiev').format('HH')),
        );
      }
    });
    return hoursToDisable;
  };

  const onSubmit = async (values: any) => {
    if (actionType === ActionTypes.ADD) {
      await createAppointment(values);
      notification.success({
        message: 'Запись успешно добавлена',
      });
    }
    if (actionType === ActionTypes.EDIT) {
      await updateAppointment({
        id: initialValues.id,
        payload: values,
      });
      notification.success({
        message: 'Запись успешно обновлена',
      });
    }
    dispatch(closeModal());
  };

  const formattedInitialValues = {
    ...initialValues,
    date_time: initialValues?.date_time && dayjs(initialValues.date_time),
  };

  return (
    <Form
      onFinish={onSubmit}
      layout={'vertical'}
      initialValues={formattedInitialValues}
    >
      <Form.Item label={'Дата и время записи'} name={'date_time'}>
        <DatePicker
          className={'w-full'}
          showTime={{
            format: 'HH:mm',
            hideDisabledOptions: true,
            disabledHours,
            disabledMinutes,
            defaultValue: dayjs('09:00', 'HH:mm'),
          }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item label={'Клиент'} name={'custom_client'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Авто'} name={'custom_car'}>
        <Input type={'text'} />
      </Form.Item>
      <Form.Item label={'Описание'} name={'description'}>
        <Input type={'text'} />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'}>
        Сохранить
      </Button>
    </Form>
  );
};
