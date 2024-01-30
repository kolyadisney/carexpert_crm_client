'use client';
import React from 'react';
import { Box, IPageHeadingAction, PageHeading } from '@/components';
import { AppointmentDesk } from '@/app/(internal)/appointments/components/appointment-desk';
import { routes } from '@/routes';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { openModal } from '@/redux/slice/modalSlice';
import { EModalsMap } from '@/components/modals/config';
import { ActionTypes } from '@/enums/action-types';
import { Button, notification, Popconfirm } from 'antd';
import { useAppDispatch } from '@/redux/hook';

const AppointmentsPage = () => {
  const dispatch = useAppDispatch();
  const pageHeadingActions = [
    {
      button: {
        text: 'Добавить запись',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () =>
          dispatch(
            openModal({
              name: EModalsMap.CREATE_UPDATE_APPOINTMENT,
              modalProps: {
                title: 'Добавить запись',
                actionType: ActionTypes.ADD,
              },
            }),
          ),
      },
    },
  ].filter(Boolean) as IPageHeadingAction[];
  return (
    <Box>
      <PageHeading
        title={routes['appointments'].name()}
        actions={pageHeadingActions}
      />
      <AppointmentDesk />
      {/*<Button*/}
      {/*  type={'primary'}*/}
      {/*  onClick={() => notification.success({ message: 'Сообщение' })}*/}
      {/*>*/}
      {/*  Нажать*/}
      {/*</Button>*/}
    </Box>
  );
};

export default AppointmentsPage;
