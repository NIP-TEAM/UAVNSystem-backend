import { IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsString()
  name: string;
}
