import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import {
  IClient,
  ICreateClientPayload,
  IUpdateClientPayload,
} from '@/redux/api/client/types';
import { IQueryParams, IResponseData } from '@/redux/types';

export const clientApi = createApi({
  reducerPath: 'clientApi',
  tagTypes: ['Clients', 'Client', 'DependsAuth'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getClients: builder.query<IResponseData<IClient[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.client.FETCH_ALL_CLIENTS,
        params,
      }),
      providesTags: ['Clients', 'DependsAuth'],
    }),
    getClientById: builder.query<IClient, string>({
      query: (id) => endpoint.client.FETCH_CLIENT_BY_ID(id),
      providesTags: ['Client', 'DependsAuth'],
    }),
    createClient: builder.mutation<IClient, ICreateClientPayload>({
      query: (payload) => ({
        url: endpoint.client.CREATE_CLIENT,
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['Clients', 'Client'],
    }),
    updateClient: builder.mutation<IClient, IUpdateClientPayload>({
      query: ({ payload, id }) => ({
        url: endpoint.client.UPDATE_CLIENT_BY_ID(id),
        body: payload,
        method: 'PATCH',
      }),
      invalidatesTags: ['Client'],
    }),
    deleteClient: builder.mutation<IClient, string>({
      query: (id) => ({
        url: endpoint.client.DELETE_CLIENT_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;
