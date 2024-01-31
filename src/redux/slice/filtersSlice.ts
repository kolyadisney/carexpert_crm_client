import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialFilters = {
  page: 1,
  limit: 12,
  searchText: '',
  order_by: '',
  order_type: '',
};

const initialState = {
  clientFilters: initialFilters,
  carFilters: initialFilters,
  serviceFilters: initialFilters,
  partFilters: initialFilters,
  userFilters: initialFilters,
  orderFilters: {
    status: '',
    ...initialFilters,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setClientFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        clientFilters: {
          ...state.clientFilters,
          ...action.payload,
        },
      };
    },
    setCarFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        carFilters: {
          ...state.carFilters,
          ...action.payload,
        },
      };
    },
    setServiceFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        serviceFilters: {
          ...state.serviceFilters,
          ...action.payload,
        },
      };
    },
    setOrderFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        orderFilters: {
          ...state.orderFilters,
          ...action.payload,
        },
      };
    },
    setServiceSearchText(state, action: PayloadAction<any>) {
      return {
        ...state,
        serviceFilters: {
          ...initialFilters,
          searchText: action.payload,
        },
      };
    },
    setCarSearchText(state, action: PayloadAction<string>) {
      return {
        ...state,
        carFilters: {
          ...initialFilters,
          searchText: action.payload,
        },
      };
    },
    setClientSearchText(state, action: PayloadAction<string>) {
      return {
        ...state,
        clientFilters: {
          ...initialFilters,
          searchText: action.payload,
        },
      };
    },
    setOrderSearchText(state, action: PayloadAction<string>) {
      return {
        ...state,
        orderFilters: {
          ...initialFilters,
          status: '',
          searchText: action.payload,
        },
      };
    },
    setPartFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        partFilters: {
          ...state.partFilters,
          ...action.payload,
        },
      };
    },
    setPartSearchText(state, action: PayloadAction<any>) {
      return {
        ...state,
        partFilters: {
          ...initialFilters,
          searchText: action.payload,
        },
      };
    },
    setUserFilters(state, action: PayloadAction<any>) {
      return {
        ...state,
        userFilters: {
          ...state.userFilters,
          ...action.payload,
        },
      };
    },
    setUserSearchText(state, action: PayloadAction<any>) {
      return {
        ...state,
        userFilters: {
          ...initialFilters,
          searchText: action.payload,
        },
      };
    },
  },
});

export const {
  setClientFilters,
  setClientSearchText,
  setCarFilters,
  setCarSearchText,
  setServiceFilters,
  setServiceSearchText,
  setOrderSearchText,
  setOrderFilters,
  setPartSearchText,
  setPartFilters,
  setUserFilters,
  setUserSearchText,
} = filtersSlice.actions;
export default filtersSlice.reducer;
