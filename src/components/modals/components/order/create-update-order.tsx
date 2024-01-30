import React from 'react';
import { Modal } from 'antd';
import { CreateUpdateOrderForm } from '@/components/forms/order/create-update-order';

export const CreateUpdateOrderModal: React.FC<any> = (props) => {
  const { modalProps, modalParams } = props;
  const { title, actionType } = modalProps;
  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateOrderForm
        actionType={actionType}
        initialValues={modalProps?.initialValues}
      />
    </Modal>
  );
};
