import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import { IQueryParams, IResponseData } from '@/redux/types';
import {
  ICreateServicePayload,
  IService,
  IServicesWithCategory,
  IUpdateServiceCategoryPayload,
  UpdateServicePayload,
} from '@/redux/api/service/types';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['Services', 'Service', 'DependsAuth'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    //services with category
    getAllServicesWithCategory: builder.query<
      IResponseData<IServicesWithCategory[]>,
      IQueryParams
    >({
      query: (params) => ({
        url: endpoint.service.FETCH_ALL_SERVICES_WITH_CATEGORY,
        params,
      }),
      providesTags: ['Services', 'DependsAuth'],
    }),
    createServiceCategory: builder.mutation<IServicesWithCategory, string>({
      query: (name) => ({
        url: endpoint.service.CREATE_SERVICE_CATEGORY,
        body: {
          name,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Services'],
    }),
    updateServiceCategory: builder.mutation<
      IServicesWithCategory,
      IUpdateServiceCategoryPayload
    >({
      query: ({ id, name }) => ({
        url: endpoint.service.UPDATE_SERVICE_CATEGORY(id),
        method: 'PATCH',
        body: {
          name,
        },
      }),
      invalidatesTags: ['Services'],
    }),
    deleteServiceCategory: builder.mutation<IServicesWithCategory, string>({
      query: (id) => ({
        url: endpoint.service.DELETE_SERVICE_CATEGORY(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Services'],
    }),
    //services
    getAllServices: builder.query<IResponseData<IService[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.service.FETCH_ALL_SERVICES,
        params,
      }),
      providesTags: ['Services', 'DependsAuth'],
    }),
    createService: builder.mutation<IService, ICreateServicePayload>({
      query: (payload) => ({
        url: endpoint.service.CREATE_SERVICE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Services'],
    }),
    updateService: builder.mutation<IService, UpdateServicePayload>({
      query: ({ id, payload }) => ({
        url: endpoint.service.UPDATE_SERVICE(id),
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Services'],
    }),
    deleteService: builder.mutation<IService, string>({
      query: (id) => ({
        url: endpoint.service.DELETE_SERVICE(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const {
  useGetAllServicesWithCategoryQuery,
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
  useDeleteServiceCategoryMutation,
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
