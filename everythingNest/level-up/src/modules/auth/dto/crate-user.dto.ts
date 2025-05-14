import { IsString } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
