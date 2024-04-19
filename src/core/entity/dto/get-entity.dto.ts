import { IsString } from 'class-validator';

export class GetEntityDto {
  @IsString()
  maps: string;
}
