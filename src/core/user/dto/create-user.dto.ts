import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @IsNotEmpty()
  @MaxLength(150)
  @IsOptional()
  @ApiProperty({ required: false })
  avatar: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  active: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  lastLogin: string;
}
