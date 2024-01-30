import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

export const createBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_WEB_API_URL,
    headers: {
      Authorization: `Bearer ${getCookie('access_token')}`,
    },
  });
};
