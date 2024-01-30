import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import { IQueryParams, IResponseData } from '@/redux/types';
import {
  ICreatePartPayload,
  IPart,
  IUpdatePartPayload,
} from '@/redux/api/part/types';

export const partApi = createApi({
  reducerPath: 'partApi',
  tagTypes: ['Parts', 'Part'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getAllParts: builder.query<IResponseData<IPart[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.parts.FETCH_ALL_PARTS,
        params,
      }),
      providesTags: ['Parts'],
    }),
    createPart: builder.mutation<IPart, ICreatePartPayload>({
      query: (payload) => ({
        url: endpoint.parts.CREATE_PART,
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['Parts'],
    }),
    updatePart: builder.mutation<IPart, IUpdatePartPayload>({
      query: ({ id, payload }) => ({
        url: endpoint.parts.UPDATE_PART(id),
        body: payload,
        method: 'PATCH',
      }),
      invalidatesTags: ['Parts'],
    }),
    deletePart: builder.mutation<IPart, string>({
      query: (id) => ({
        url: endpoint.parts.DELETE_PART(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Parts'],
    }),
  }),
});

export const {
  useGetAllPartsQuery,
  useCreatePartMutation,
  useUpdatePartMutation,
  useDeletePartMutation,
} = partApi;
