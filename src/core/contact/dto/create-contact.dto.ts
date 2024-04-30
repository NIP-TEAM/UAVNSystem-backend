import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateContactListDto {
  @IsString()
  name: string;
}

export class CreateContactDto {
  @IsOptional()
  @IsString()
  name: string;

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
