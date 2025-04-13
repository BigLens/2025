import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async createUser(@Body() dto: UserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto)
  }
}
