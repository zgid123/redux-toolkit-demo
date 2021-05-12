/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { isEmpty, reject } from 'ramda';
import { stringifyUrl, ParsedQuery } from 'query-string';
import Axios, { CancelToken, AxiosRequestConfig } from 'axios';

import axiosErrorParser from './parser/axiosErrorParser';

interface IOptionsParams {
  headers?: AxiosRequestConfig['headers'];
}

interface IOptionsResult {
  [key: string]: string | object;
}

interface IRequestProps {
  endpoint: string;
  version?: number;
  cancelToken?: CancelToken;
  headers?: AxiosRequestConfig['headers'];
  method: 'get' | 'post' | 'put' | 'delete';
}

interface IRequestBody {
  data?: object;
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
}

interface IRequestParams {
  params?: object;
}

interface IGetParams {
  query?: {
    [key: string]: string | number;
  };
}

/* eslint-disable @typescript-eslint/indent */
type TGetParams = IGetParams &
  IRequestParams &
  Exclude<Omit<IRequestProps, 'method'>, IRequestBody>;
/* eslint-enable @typescript-eslint/indent */

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

const options = ({ headers = {} }: IOptionsParams) => {
  let options = {} as IOptionsResult;

  options.headers = { ...(options.headers as object), ...headers };

  return options;
};

const request = async ({
  data,
  params,
  headers,
  endpoint,
  version = 1,
  method = 'get',
  onUploadProgress,
}: IRequestProps & IRequestBody & IRequestParams) => {
  return Axios.request({
    ...reject((value) => !(value instanceof FormData) && isEmpty(value), {
      data,
      params,
      method,
      url: `${apiEndpoint}/v${version}/${endpoint.replace(/^\//, '')}`,
    }),
    ...options({ headers }),
    onUploadProgress,
  })
    .then((response) => {
      return response.data;
    })
    .catch(
      axiosErrorParser((error) => {
        return Promise.reject(error);
      }),
    );
};

const api = {
  get: <T extends any>({
    query,
    endpoint,
    ...options
  }: TGetParams): Promise<T> => {
    if (query) {
      endpoint = stringifyUrl({
        url: endpoint,
        query: query as ParsedQuery,
      });
    }

    return request({ method: 'get', endpoint, ...options });
  },
  post: <T extends any>({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<T> => {
    return request({ method: 'post', endpoint, ...options });
  },
  put: ({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<any> => {
    return request({ method: 'put', endpoint, ...options });
  },
  delete: ({
    endpoint,
    ...options
  }: Omit<IRequestProps, 'method'> & IRequestBody): Promise<any> => {
    return request({ method: 'delete', endpoint, ...options });
  },
  CancelToken: Axios.CancelToken,
};

export default api;
