import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { middleware } from './middleware';
import { getCookie } from 'cookies-next';
import { makeAuthorizationHeader } from '@/utils/common';

/**
|-------------------------------------------------------------------------------------------------------------------
| Про токены, JSON Web Tokens (JWT), аутентификацию и авторизацию. Token-Based Authentication
|-------------------------------------------------------------------------------------------------------------------
| https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
| https://bezkoder.com/node-js-jwt-authentication-mysql/
*/
const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const access_token = getCookie('access_token');
  if (access_token) {
    config.headers['Authorization'] = makeAuthorizationHeader(access_token);
  }
  config.headers['TimezoneId'] =
    window.Intl.DateTimeFormat().resolvedOptions().timeZone;
  return config;
};
const responseInterceptorOnSuccess = (
  response: AxiosResponse<{ data: any }>,
): AxiosResponse => response;
const responseInterceptorOnError = (error: AxiosError): never => {
  middleware.handleError(error);
  throw error;
};

http.interceptors.request.use(requestInterceptor);
http.interceptors.response.use(
  responseInterceptorOnSuccess,
  responseInterceptorOnError,
);

export { http };
