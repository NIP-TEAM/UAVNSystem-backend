import { IsObject, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetProtocolDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  category: number;
}
