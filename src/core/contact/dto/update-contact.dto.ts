import { IsString } from 'class-validator';

export class UpdateContactListDto {
  @IsString()
  name: string;
}
