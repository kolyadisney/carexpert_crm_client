import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  servicesLoading: false,
};

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    setServicesLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        servicesLoading: action.payload,
      };
    },
  },
});

export const { setServicesLoading } = loadersSlice.actions;
export default loadersSlice.reducer;
