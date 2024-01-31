import {
  configureStore,
  isRejected,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import filtersSlice from '@/redux/slice/filtersSlice';
import modalSlice from '@/redux/slice/modalSlice';
import carBrandSlice from '@/redux/slice/carSlice';
import loadersSlice from '@/redux/slice/loadersSlice';
import { carApi } from '@/redux/api/car';
import { clientApi } from '@/redux/api/client';
import { userApi } from '@/redux/api/user';
import { serviceApi } from '@/redux/api/service';
import { notification } from 'antd';
import { signOut } from 'next-auth/react';
import { appointmentApi } from '@/redux/api/appointment';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { orderApi } from '@/redux/api/order';
import { partApi } from '@/redux/api/part';
import router from 'next/router';
import { routes } from '@/routes';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => async (action) => {
    if (isRejected(action)) {
      if ((action as any).payload?.status !== 401) {
        notification.error({
          message: 'Что-то пошло не так',
        });
      }
      if ((action as any).payload?.status === 401) {
        const refreshToken = getCookie('refresh_token');
        if (refreshToken) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_WEB_API_URL}/auth/refresh`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              },
            );
            const tokens = await response.json();
            if (tokens) {
              deleteCookie('access_token');
              deleteCookie('refresh_token');
              setCookie('access_token', tokens?.access_token);
              setCookie('refresh_token', tokens?.refresh_token);
              window.location.reload();
            }
          } catch (error) {
            deleteCookie('access_token');
            deleteCookie('refresh_token');
            await signOut();
            await router.push(routes['login'].link());
          }
        } else {
          deleteCookie('access_token');
          deleteCookie('refresh_token');
          await signOut();
          await router.push(routes['login'].link());
        }
      }

      return next(action);
    }
    return next(action);
  };

const store = configureStore({
  reducer: {
    [carApi.reducerPath]: carApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [partApi.reducerPath]: partApi.reducer,
    filters: filtersSlice,
    modal: modalSlice,
    loaders: loadersSlice,
    carBrand: carBrandSlice,
  },
  devTools: process.env.NODE_ENV != 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      carApi.middleware,
      clientApi.middleware,
      userApi.middleware,
      serviceApi.middleware,
      appointmentApi.middleware,
      orderApi.middleware,
      partApi.middleware,
      rtkQueryErrorLogger,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
