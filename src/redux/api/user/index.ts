import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
import { IQueryParams, IResponseData, IUser } from '@/redux/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users', 'DependsAuth'],
  baseQuery: createBaseQuery(),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IResponseData<IUser[]>, IQueryParams>({
      query: (params) => ({
        url: endpoint.user.FETCH_ALL_USERS,
        params,
      }),
      providesTags: ['Users'],
    }),
    getCurrentUser: builder.query<IUser, null>({
      query: () => ({
        url: endpoint.user.FETCH_CURRENT_USER,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<IUser, Omit<IUser, 'id'>>({
      query: (payload) => ({
        url: endpoint.auth.REGISTER,
        body: payload,
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<IUser, any>({
      query: ({ id, payload }) => ({
        url: endpoint.user.UPDATE_USER(id),
        body: payload,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
