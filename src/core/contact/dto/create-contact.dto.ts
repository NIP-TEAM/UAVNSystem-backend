import { IsString } from 'class-validator';

export class CreateContactListDto {
  @IsString()
  name: string;
}
