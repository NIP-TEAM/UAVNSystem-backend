import { IsObject, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetNetworkDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  filter: string;
}
