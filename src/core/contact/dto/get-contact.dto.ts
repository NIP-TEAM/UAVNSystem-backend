import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetContactListDto {
  @IsString()
  filters: '';
}

export class GetContactDto {
  @IsObject()
  pagination: BasicPagination;

  @IsObject()
  sorter: { [key: string]: boolean };

  @IsNumber()
  @IsOptional()
  creator?: number;

  @IsString()
  @IsOptional()
  searchKey?: string;

  @IsOptional()
  @IsString()
  selectKeys: string;
}
