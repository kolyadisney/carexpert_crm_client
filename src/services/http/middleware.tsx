import React from 'react';
import { AxiosError } from 'axios';
import { List, notification } from 'antd';
import { getCookie } from 'cookies-next';

const showErrors = (errors: Array<{ title: string }>) => {
  if (!errors.length) return;

  if (errors.length === 1) {
    notification.error({
      message: errors[0].title,
    });
  } else {
    notification.error({
      type: 'error',
      message: <strong>{'Errors that need to be fixed'}</strong>,
      description: (
        <List
          size={'small'}
          dataSource={errors}
          renderItem={(error, idx) => (
            <List.Item key={idx}>{error.title}</List.Item>
          )}
        />
      ),
    });
  }
};
const tokenRefreshFailure = (url?: string) => {
  const isTokenRefreshRequest = url; //url.endsWith(endpoint.auth.REFRESH_TOKEN);

  if (isTokenRefreshRequest) {
    //TODO: Refresh token 1
  }

  return isTokenRefreshRequest;
};

export const middleware: {
  refreshToken(params: { error: AxiosError; callback?: () => void }): void;
  handleError(error: AxiosError): void;
} = {
  refreshToken({ callback }) {
    const refresh_token = getCookie('access_token');
    if (refresh_token) {
      //TODO: Refresh token 2
    }
  },
  handleError: (error) => {
    const { response } = error;

    if (response) {
      const { status, statusText, config, data } = response;
      const { url } = config;

      switch (status) {
        case 400: // Bad request
          if (!tokenRefreshFailure(url)) {
            notification.error({
              message: 'Something went wrong',
              description: 'Details can be found in the developer console',
            });
          }
          break;

        case 401: // Unauthorized
          /** src/store/worker-middleware.ts:17 */
          break;

        case 403: // Forbidden
          break;

        case 404: // Not found
          break;

        case 406: // Not Acceptable
          break;

        case 422: // Unprocessable Entity
          break;

        case 429: // Too Many Requests
          break;

        case 500: // Internal Server Error
          break;

        case 503: // Service Unavailable
          break;

        default: // Default error handler
          notification.error({
            message: 'Something went wrong',
            description: 'Please, try again later',
          });
          console.error(
            'Status => ',
            status,
            '\n',
            'Status text => ',
            statusText,
            '\n',
            'Request config => ',
            config,
            '\n',
            'Response data => ',
            data,
            '\n',
          );
          break;
      }
    }
  },
};
