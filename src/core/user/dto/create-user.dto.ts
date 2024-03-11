import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsNumber()
  password: string;

  @IsString()
  name: string;
}
