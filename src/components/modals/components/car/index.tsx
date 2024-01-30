import React from 'react';
import { Modal } from 'antd';
import { CarCreateForm } from '@/components/forms/car/car-create';
import { IModalOwnProps } from '@/components/modals/components/car/types';

export const UpdateCreateCar: React.FC<IModalOwnProps> = (props: any) => {
  const { modalProps, modalParams } = props;
  const { title, client_id, actionType } = modalProps;
  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CarCreateForm
        client_id={client_id}
        withClientField={modalProps?.withClientField}
        initialValues={modalProps?.initialValues}
        actionType={actionType}
      />
    </Modal>
  );
};
