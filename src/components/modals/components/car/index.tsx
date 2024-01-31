import React from 'react';
import { Modal } from 'antd';
import { CreateUpdateCar } from '@/components/forms/car/create-update-car';
import { IModalOwnProps } from '@/components/modals/components/car/types';

export const UpdateCreateCar: React.FC<IModalOwnProps> = (props: any) => {
  const { modalProps, modalParams } = props;
  const { title, client_id, actionType } = modalProps;
  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateCar
        client_id={client_id}
        withClientField={modalProps?.withClientField}
        initialValues={modalProps?.initialValues}
        actionType={actionType}
      />
    </Modal>
  );
};
