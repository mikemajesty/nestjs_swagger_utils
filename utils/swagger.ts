import { ApiResponseOptions } from '@nestjs/swagger';

type SwaggerError = {
  status: number;
  error: unknown;
  description?: string;
};

type SwaggerText = {
  status: number;
  text: string | unknown;
  description?: string;
};

type SwaggerJSON = {
  status: number;
  json: unknown;
  description?: string;
};

export default class Swagger {
  static defaultResponseError({ status, error, description }: SwaggerError): ApiResponseOptions {
    return {
      schema: {
        example: error
      },
      description,
      status,
    };
  }

  static defaultResponseText({ status, text, description }: SwaggerText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      description,
      status,
    };
  }

  static defaultResponseJSON({ status, json, description }: SwaggerJSON): ApiResponseOptions {
    return {
      content: {
        'application/json': {
          schema: {
            example: json,
          },
        },
      },
      description,
      status,
    };
  }

  static defaultRequestJSON(json: unknown): ApiResponseOptions {
    return {
      schema: {
        example: json,
      },
    };
  }
}
