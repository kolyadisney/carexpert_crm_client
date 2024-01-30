import React from 'react';
import { Modal } from 'antd';
import { CreateUpdateOrderPartsForm } from '@/components';
import { IOrderPartsModalProps } from '@/components/modals/components/part/types';

export const CreateUpdateOrderPartsModal: React.FC<IOrderPartsModalProps> = (
  props,
) => {
  const { modalProps, modalParams } = props;
  const { title, order_id } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateOrderPartsForm
        order_id={order_id}
        initialValues={modalProps?.initialValues}
      />
    </Modal>
  );
};
