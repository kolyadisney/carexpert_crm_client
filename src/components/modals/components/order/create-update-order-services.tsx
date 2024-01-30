'use client';
import React from 'react';
import { Modal } from 'antd';
import { ICreateUpdateOrderServiceProps } from '@/components/modals/components/order/types';
import { CreateUpdateOrderServicesForm } from '@/components';

export const CreateUpdateOrderServices: React.FC<
  ICreateUpdateOrderServiceProps
> = (props) => {
  const { modalProps, modalParams } = props;
  const { title, order_id } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateOrderServicesForm
        order_id={order_id}
        initialValues={modalProps?.initialValues}
      />
    </Modal>
  );
};
