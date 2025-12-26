import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token.ts';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {BACKEND_URL, REQUEST_TIMEOUT, SERVER_UNAVAILABLE_TEXT} from '../const.ts';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        if (shouldDisplayError(error.response)) {
          const detailMessage = (error.response.data);

          toast.warn(detailMessage.message);
        }
      } else {
        toast.warn(SERVER_UNAVAILABLE_TEXT);
      }

      throw error;
    }
  );

  return api;
};
