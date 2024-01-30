import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import { IQueryParams, IResponseData } from '@/redux/types';
import {
  ICar,
  ICreateCarPayload,
  IUpdateCarPayload,
} from '@/redux/api/car/types';

export const carApi = createApi({
  reducerPath: 'carApi',
  tagTypes: ['Cars', 'Car', 'Client', 'Brands'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getCars: builder.query<IResponseData<ICar[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.car.FETCH_ALL_CARS,
        params,
      }),
      providesTags: ['Cars', 'Brands'],
    }),
    getCarBrand: builder.query<any, any>({
      query: () => endpoint.car.FETCH_CAR_BRAND,
      transformResponse: (responseData: any) => {
        return responseData?.data;
      },
    }),
    getCarById: builder.query<ICar, string>({
      query: (id) => endpoint.car.FETCH_CAR_BY_ID(id),
      providesTags: ['Car'],
    }),
    createCar: builder.mutation<ICar, ICreateCarPayload>({
      query: (payload) => ({
        url: endpoint.car.CREATE_CAR,
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: (result) => {
        return ['Car', 'Client', { type: 'Client', id: result?.client_id }];
      },
    }),
    updateCar: builder.mutation<ICar, IUpdateCarPayload>({
      query: ({ payload, id }) => ({
        url: endpoint.car.UPDATE_CAR_BY_ID(id),
        body: payload,
        method: 'PATCH',
      }),
      invalidatesTags: (result) => {
        return [{ type: 'Client', id: result?.client_id }];
      },
    }),
    deleteCar: builder.mutation<ICar, string>({
      query: (id) => ({
        url: endpoint.car.DELETE_CAR_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result) => {
        return ['Car', 'Client', { type: 'Client', id: result?.client_id }];
      },
    }),
  }),
});

export const {
  useGetCarsQuery,
  useDeleteCarMutation,
  useCreateCarMutation,
  useUpdateCarMutation,
  useGetCarByIdQuery,
  useGetCarBrandQuery,
} = carApi;
