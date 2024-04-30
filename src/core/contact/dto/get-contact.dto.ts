import { IsObject, IsOptional, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetContactListDto {}

export class GetContactDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  selectKeys: string;
}
