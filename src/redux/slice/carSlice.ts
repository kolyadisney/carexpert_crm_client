import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  models: [],
};

const carSlice = createSlice({
  name: 'carBrand',
  initialState,
  reducers: {
    setCarModels: (state, action: any) => {
      return {
        ...state,
        models: action.payload,
      };
    },
  },
});

export const { setCarModels } = carSlice.actions;
export default carSlice.reducer;
