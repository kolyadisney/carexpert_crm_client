import React from 'react';
import { Modal } from 'antd';
import { CreateUpdateAppointmentForm } from '@/components';
import { IModalOwnProps } from '@/components/modals/components/appointment/types';

export const CreateUpdateAppointmentModal: React.FC<IModalOwnProps> = (
  props: any,
) => {
  const { modalProps, modalParams } = props;
  const { title, actionType, data } = modalProps;
  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateAppointmentForm
        actionType={actionType}
        initialValues={modalProps?.initialValues}
        data={data}
      />
    </Modal>
  );
};
