import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsString()
  name: string;
  
  @IsNumber()
  protocolId: number
}
