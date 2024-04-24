import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetContactListDto {
  @IsNumber()
  @IsOptional()
  creatorId: number;
  @IsOptional()
  @IsString()
  searchKey: string;
}
