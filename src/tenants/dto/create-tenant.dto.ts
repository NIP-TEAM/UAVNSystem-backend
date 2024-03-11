import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTenantDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @MaxLength(150)
  @ApiProperty({ required: true })
  avatar: string;
}
