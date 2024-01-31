import React from 'react';
import { Modal } from 'antd';
import { IPartModalProps } from '@/components/modals/components/part/types';
import { CreateUpdatePartFrom } from '@/components';

export const CreateUpdatePartModal: React.FC<IPartModalProps> = (props) => {
  const { modalProps, modalParams } = props;
  const { title, actionType } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdatePartFrom
        initialValues={modalProps?.initialValues}
        actionType={actionType}
      />
    </Modal>
  );
};
