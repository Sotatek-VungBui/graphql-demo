import { Request } from 'express';

export type DataResponse =
  | ({
      message?: string;
      error?: string;
    } & Record<string, unknown>)
  | string
  | undefined;
declare global {
  namespace Express {
    interface Request {
      _id: string;
      resTemp: DataResponse;
      auth?: Payload;
    }

    interface Response {
      jsonApi: (status?: number, data?: DataResponse) => Response;
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    auth?: Payload;
  }
}

export interface GraphQLContext {
  req: Request;
  auth?: Payload;
}

export type Payload = {
  id: string;
  type: 'user';
};
