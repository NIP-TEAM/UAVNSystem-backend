import { IsObject, IsOptional, IsString } from 'class-validator';
import { BasicPagination } from 'src/utils/types';

// export class GetContactListDto {
//   @IsOptional()
//   @IsString()
//   creatorIds: string;
//   @IsOptional()
//   @IsString()
//   searchKey: string;
// }

export class GetContactDto {
  @IsObject()
  pagination: BasicPagination;

  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  selectKeys: string;
}
