import { IsObject, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export type CategoryType = 'defualt' | 'costmer';

export class GetProtocalDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  category: CategoryType;
}
