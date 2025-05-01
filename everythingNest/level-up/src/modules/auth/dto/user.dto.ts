import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
