import { Response } from 'express';
import { isNil, isEmpty, reject } from 'ramda';

import { RTAction } from '@interfaces/controller';
import { IContentProps } from '@services/HttpError';

export interface IErrorResponseProps {
  code?: number;
  message?: string;
  content?: IContentProps;
}

interface IRespondParams extends IErrorResponseProps {
  data?: any; // eslint-disable-line
  page?: number;
  size?: number;
  total?: number;
  pageSize?: number;
  statusCode?: number;
}

interface IRespondMessageParams {
  message: string;
  statusCode?: number;
}

const sanitizeRespondedData = ({
  data,
  size,
  code,
  total,
  content,
  message,
  page = 1,
  pageSize,
  statusCode,
}: IRespondParams) => {
  if (statusCode !== 200) {
    return reject(isNil, {
      message,
      code,
      content,
    });
  }

  if (Array.isArray(data)) {
    let pagy: Record<string, unknown> | undefined = reject(isNil, {
      size,
      pageSize,
      total,
    });

    if (!isEmpty(pagy)) {
      pagy = {
        ...pagy,
        page: parseInt(page.toString(), 10) || 1,
      };
    } else {
      pagy = undefined;
    }

    return {
      data,
      ...(pagy ? { pagy } : {}),
    };
  }

  return {
    data,
  };
};

class ApiResponse {
  public static respond({
    statusCode = 200,
    ...respondedParams
  }: IRespondParams) {
    return (response: Response): RTAction => {
      const respondedData = sanitizeRespondedData({
        ...respondedParams,
        statusCode,
      });

      return response.status(statusCode).send(respondedData);
    };
  }

  public static respondMessage({
    message = '',
    statusCode = 200,
  }: IRespondMessageParams) {
    return (response: Response): RTAction => {
      return response.status(statusCode).send({ message });
    };
  }
}

export default ApiResponse;
