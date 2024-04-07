import { UserInfo } from '@prisma/client';

export interface JwtAuthReq {
  user: {
    tenant: UserInfo;
  };
  [key: string | number | symbol]: unknown;
}

export interface BasicPagination {
  current: number;
  pageSize: number;
}
