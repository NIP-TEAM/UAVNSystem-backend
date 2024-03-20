import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from 'class-validator';

export class RegisterUserDto extends CreateUserDto {
  @IsString()
  @Length(6)
  @ApiProperty()
  verifyCode: string;
}
