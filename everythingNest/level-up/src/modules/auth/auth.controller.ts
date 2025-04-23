import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/user.dto';
import { JwtAuthGuard } from '@modules/jwt/jwt-guard';
import { User } from './custom-decorator/custom-user';
import { CreateUserDto } from './dto/crate-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@User() user: UserDto) {
    return this.authService.getUser(user);
  }
}
