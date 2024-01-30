import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoint } from '@/services/api/endpoints';
import { createBaseQuery } from '@/redux/createBaseQuery';
export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: createBaseQuery(),
  tagTypes: ['Appointments', 'DependsAuth'],
  endpoints: (builder) => ({
    getAppointments: builder.query<any, any>({
      query: (params) => ({
        url: endpoint.appointment.FETCH_ALL_APPOINTMENTS,
        params,
      }),
      providesTags: ['Appointments', 'DependsAuth'],
    }),
    createAppointment: builder.mutation<any, any>({
      query: (payload) => ({
        url: endpoint.appointment.CREATE_APPOINTMENT,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation<any, any>({
      query: ({ id, payload }) => ({
        url: endpoint.appointment.UPDATE_APPOINTMENT(id),
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Appointments'],
    }),
    deleteAppointment: builder.mutation<any, string>({
      query: (id) => ({
        url: endpoint.appointment.DELETE_APPOINTMENT(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
