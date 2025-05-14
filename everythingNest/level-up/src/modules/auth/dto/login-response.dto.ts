import { Expose } from 'class-transformer';
import { UserDto } from './user.dto';

export class LoginResponseDto {
  @Expose()
  user: UserDto;

  @Expose()
  access_token: string;
}
