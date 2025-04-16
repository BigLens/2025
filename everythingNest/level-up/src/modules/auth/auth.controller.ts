import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/auth.dto';
import { JwtAuthGuard } from '@modules/jwt/jwt-guard';
import { Request } from 'express';
import { User } from './custom-decorator/custom-user';

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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@User() user: UserDto) {
    return this.authService.getUser(user)
  }
}
