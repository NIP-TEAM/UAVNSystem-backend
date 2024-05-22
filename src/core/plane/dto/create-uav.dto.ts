import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUavDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  networkId: number;

  @IsString()
  mac: string;
}
