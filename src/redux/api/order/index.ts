import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import { IQueryParams, IResponseData } from '@/redux/types';
import { IOrder } from '@/redux/api/order/types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Orders', 'Order'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getAllOrders: builder.query<IResponseData<IOrder[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.order.FETCH_ALL_ORDERS,
        params,
      }),
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query<IOrder, number>({
      query: (id) => endpoint.order.FETCH_ORDER_BY_ID(id),
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<IOrder, any>({
      query: (payload) => ({
        url: endpoint.order.CREATE_ORDER,
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    updateOrder: builder.mutation<IOrder, any>({
      query: ({ id, payload }) => ({
        url: endpoint.order.UPDATE_ORDER(id),
        body: payload,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    addServicesToOrder: builder.mutation<IOrder, any>({
      query: (payload) => ({
        url: endpoint.order.ADD_SERVICES_TO_ORDER,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
    addPartsToOrder: builder.mutation<IOrder, any>({
      query: (payload) => ({
        url: endpoint.order.ADD_PARTS_TO_ORDER,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Orders', 'Order'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useAddServicesToOrderMutation,
  useUpdateOrderMutation,
  useCreateOrderMutation,
  useAddPartsToOrderMutation,
} = orderApi;
