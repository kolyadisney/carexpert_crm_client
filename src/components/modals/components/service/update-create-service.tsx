import React from 'react';
import { IModalOwnProps } from '@/components/modals/components/service/types';
import { Modal } from 'antd';
import { CreateEditServiceForm } from '@/components/forms/service/create-edit-service';

export const UpdateCreateService: React.FC<IModalOwnProps> = (props) => {
  const { modalProps, modalParams } = props;
  const { title, actionType } = modalProps;
  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateEditServiceForm
        actionType={actionType}
        initialValues={modalProps?.initialValues}
        categoryId={modalProps?.categoryId}
        categoryName={modalProps?.categoryName}
      />
    </Modal>
  );
};
