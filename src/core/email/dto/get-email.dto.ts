import { IsObject, IsString, IsOptional } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetEmailsDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  selectKeys: string;
}
