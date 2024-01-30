import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalProps: {},
  privateData: {
    client_id: '',
    category_id: '',
  },
  name: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<any>) {
      return {
        ...state,
        isModalOpen: true,
        name: action.payload.name,
        modalProps: action.payload.modalProps,
      };
    },
    closeModal(state) {
      return {
        ...state,
        ...initialState,
      };
    },
    setModalPrivateData(state, action: PayloadAction<any>) {
      return {
        ...state,
        privateData: action.payload,
      };
    },
  },
});

export const { openModal, closeModal, setModalPrivateData } =
  modalSlice.actions;
export default modalSlice.reducer;
