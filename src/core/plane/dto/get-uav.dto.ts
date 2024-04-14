import { IsObject, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetUavDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  filter: string;
}
