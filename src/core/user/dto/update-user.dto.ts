import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(LoginUserDto) {
  @IsString()
  @IsOptional()
  @ApiProperty()
  lastLogin?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  active?: boolean;
}
