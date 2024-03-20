import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ForgetUserDto {
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @Length(6)
  @ApiProperty({ required: true })
  verifyCode;
}
