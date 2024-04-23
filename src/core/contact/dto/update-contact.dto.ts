import { PartialType } from '@nestjs/mapped-types';
import { CreateNetworkDto } from './create-contact.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNetworkDto extends PartialType(CreateNetworkDto) {
  @IsString()
  @IsOptional()
  connectMap: string;
}
