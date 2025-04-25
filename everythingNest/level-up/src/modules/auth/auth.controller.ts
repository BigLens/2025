import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/user.dto';
import { JwtAuthGuard } from '@modules/jwt/jwt-guard';
import { User } from './custom-decorator/custom-user';
import { CreateUserDto } from './dto/crate-user.dto';
import { Request } from 'express';

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

  @Get('users')
  async getAllUser() {
    return this.authService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-id/:id')
  async getUserId(@Param('id') id: string) {
    return this.authService.getUserId(id);
  }
}
