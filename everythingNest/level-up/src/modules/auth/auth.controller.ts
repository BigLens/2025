import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/auth.dto';
import { JwtAuthGuard } from '@modules/jwt/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async createUser(@Body() dto: UserDto) {
    return this.authService.createUser(dto);
  }

 // @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto)
  }
}
