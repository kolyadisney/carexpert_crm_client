'use client';
import {
  Button,
  notification,
  Popconfirm,
  Segmented,
  Table,
  Tooltip,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnProps } from 'antd/es/table';
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from '@/redux/api/appointment';
import React from 'react';
import {
  convertDateToServerFormat,
  generateTimeSlots,
} from '@/app/(internal)/appointments/utils';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from '@/redux/hook';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';

//TODO: Refactor appoinrments

export const AppointmentDesk = () => {
  const dispatch = useAppDispatch();
  let currentDate = dayjs();
  if (currentDate.day() === 0) {
    currentDate = currentDate.add(1, 'week').startOf('week');
  }
  const [selectedDate, setSelectedDate] = React.useState<any>(
    currentDate.format('dd, DD.MM.YYYY'),
  );
  const [currentPeriodRange, setCurrentPeriodRange] = React.useState(0);
  const mondayOfThisWeek = dayjs()
    .add(currentPeriodRange, 'week')
    .startOf('week');

  const currentAppointmentsPeriod = Array.from({ length: 6 }, (_, i) =>
    mondayOfThisWeek.add(i, 'day').format('dd, DD.MM.YYYY'),
  );
  const { data, isLoading } = useGetAppointmentsQuery({
    date_from: convertDateToServerFormat(selectedDate),
    date_to: convertDateToServerFormat(selectedDate),
  });

  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const startTime = '09:00';
  const endTime = '18:00';

  const timeSlots = React.useMemo(
    () => generateTimeSlots(startTime, endTime),
    [],
  );

  const dataSource = React.useMemo(
    () =>
      timeSlots.map((item, index) => {
        const currentAppointment = data?.data.find((appointment: any) => {
          const appointmentTime = dayjs(appointment.date_time)
            .tz('Europe/Kiev')
            .format('HH:mm');
          return appointmentTime === item;
        });
        return {
          time: item,
          ...currentAppointment,
        };
      }),
    [data],
  );

  const columns: ColumnProps<any>[] = [
    {
      title: 'Время',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '100px',
    },
    {
      title: 'Авто',
      key: 'car',
      width: '20%',
      render: (_: any, record) => {
        return record?.custom_car;
      },
    },
    {
      title: 'Клиент',
      key: 'client',
      width: '20%',
      render: (_: any, record) => {
        return record?.custom_client;
      },
    },
    {
      title: 'Описание',
      key: 'description',
      width: '50%',
      render: (_: any, record) => {
        return record?.description;
      },
    },
    {
      title: '',
      key: 'actions',
      width: '7%',
      render: (_: any, record) => {
        return (
          <>
            {record.id && (
              <>
                <Tooltip placement={'top'} title={'Редактировать'}>
                  <Button
                    type={'primary'}
                    icon={<EditOutlined />}
                    style={{ margin: '0 8px' }}
                    size={'small'}
                    onClick={() =>
                      dispatch(
                        openModal({
                          name: EModalsMap.CREATE_UPDATE_APPOINTMENT,
                          modalProps: {
                            title: 'Редактирование записи',
                            actionType: ActionTypes.EDIT,
                            initialValues: record,
                            data: data?.data,
                          },
                        }),
                      )
                    }
                  />
                </Tooltip>
                <Tooltip placement={'top'} title={'Удалить'}>
                  <Popconfirm
                    title={'Вы действительно хотите удалить?'}
                    onConfirm={async () => {
                      await deleteAppointment(record?.id);
                      notification.success({
                        message: 'Запись успешно удалена',
                      });
                    }}
                  >
                    <Button
                      type={'primary'}
                      danger
                      icon={<DeleteOutlined />}
                      size={'small'}
                    />
                  </Popconfirm>
                </Tooltip>
              </>
            )}
          </>
        );
      },
    },
  ];
  return (
    <div className={'flex flex-col justify-center'}>
      <div className={'self-center !my-4'}>
        <Button
          type={'primary'}
          onClick={() =>
            setCurrentPeriodRange((current: number) => current - 1)
          }
          icon={<ArrowLeftOutlined />}
        />
        <Segmented
          options={currentAppointmentsPeriod}
          size={'middle'}
          defaultValue={selectedDate}
          onChange={setSelectedDate}
        />
        <Button
          type={'primary'}
          onClick={() =>
            setCurrentPeriodRange((current: number) => current + 1)
          }
          icon={<ArrowRightOutlined />}
        />
      </div>
      <Table
        loading={isLoading || isDeleting}
        columns={columns}
        dataSource={dataSource}
        bordered
        size={'middle'}
      />
    </div>
  );
};
