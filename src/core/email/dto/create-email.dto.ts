import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  name: string;

  @IsArray()
  contactIds: number[];

  @IsArray()
  condition: { [key: string]: number }[];

  @IsNumber()
  networkId: number;
}
