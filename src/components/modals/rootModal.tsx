import React from 'react';
import { IModalCommonProps, TModalProps } from './types';
import { getModalsMap } from './config';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeModal } from '@/redux/slice/modalSlice';

export const ModalRoot: React.FC<TModalProps> = (props) => {
  // const { privateParams, publicParams, forwardProps, name } = useAppSelector(
  //   (state) => state.modal,
  // );
  const dispatch = useAppDispatch();
  const { isModalOpen, name, modalProps } = useAppSelector(
    (state) => state.modal,
  );
  // const {
  //   className = '',
  //   centered = true,
  //   width = 520,
  //   style = {},
  // } = publicParams;

  const modalsMap = getModalsMap();

  // @ts-ignore
  const Content = modalsMap[String(name)] as any;

  const currentModalProps: IModalCommonProps = {
    modalProps,
    modalParams: {
      centered: true,
      width: 520,
      onCancel: () => dispatch(closeModal()),
      visible: isModalOpen,
    },
  };

  return !!Content ? <Content {...currentModalProps} /> : null;
};
