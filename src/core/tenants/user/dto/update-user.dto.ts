import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(LoginUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty()
  lastLogin?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  name?: string;
}
