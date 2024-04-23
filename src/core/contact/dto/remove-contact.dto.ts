import { IsArray } from 'class-validator';

export class RemoveNetworkDto {
  @IsArray()
  ids: number[];
}
