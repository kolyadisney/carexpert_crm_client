import React from 'react';
import { Modal } from 'antd';
import { ICreateUpdateUserModalProps } from '@/components/modals/components/user/types';
import { CreateUpdateUserForm } from '@/components';

export const CreateUpdateUserModal: React.FC<ICreateUpdateUserModalProps> = (
  props,
) => {
  const { modalProps, modalParams } = props;
  const { title, actionType } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateUpdateUserForm
        actionType={actionType}
        initialValues={modalProps?.initialValues}
      />
    </Modal>
  );
};
