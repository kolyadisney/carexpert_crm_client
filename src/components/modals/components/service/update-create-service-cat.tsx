import React from 'react';
import { Modal } from 'antd';
import { IModalOwnProps } from '@/components/modals/components/service/types';
import { CreateEditServiceCategoryForm } from '@/components/forms/service/create-edit-service-category';

export const UpdateCreateServiceCategory: React.FC<IModalOwnProps> = (
  props,
) => {
  const { modalProps, modalParams } = props;
  const { title, actionType } = modalProps;

  return (
    <Modal {...modalParams} title={title} footer={null}>
      <CreateEditServiceCategoryForm
        initialValues={modalProps?.initialValues}
        actionType={actionType}
      />
    </Modal>
  );
};
