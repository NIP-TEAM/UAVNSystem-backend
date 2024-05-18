import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  name: string;

  @IsArray()
  contactIds: number[];

  @IsArray()
  conditions: { [key: string]: number }[];

  @IsNumber()
  networkId: number;
}
