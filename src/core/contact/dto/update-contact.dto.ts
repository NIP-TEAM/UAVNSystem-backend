import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateContactListDto {
  @IsString()
  name: string;
}

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsArray()
  contactListIds: number[];

  @IsOptional()
  @IsString()
  note: string;
}
