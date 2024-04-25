import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

export class GetContactListDto {
  @IsOptional()
  @IsString()
  creatorIds: string;
  @IsOptional()
  @IsString()
  searchKey: string;
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
