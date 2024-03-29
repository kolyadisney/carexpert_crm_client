import React from 'react';
import { Modal } from 'antd';
import { CreateUpdateClientForm } from '@/components';
import { IModalOwnProps } from '@/components/modals/components/client/types';

export const UpdateCreateClient: React.FC<IModalOwnProps> = (props: any) => {
  const { modalProps, modalParams } = props;
  const { title, actionType, initialValues } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateClientForm
        initialValues={modalProps?.initialValues}
        actionType={actionType}
      />
    </Modal>
  );
};
