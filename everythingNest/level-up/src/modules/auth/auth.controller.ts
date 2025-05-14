import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UserDto } from '@modules/auth/dto/user.dto';
import { JwtAuthGuard } from '@modules/jwt/jwt-guard';
import { User } from './custom-decorator/custom-user';
import { CreateUserDto } from './dto/crate-user.dto';
import { Serialize } from './interceptor/interceptor.class';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserEntity } from './model/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create-user')
  @Serialize(UserDto)
  async createUser(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  @Serialize(LoginResponseDto)
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Get('users')
  @Serialize(UserDto)
  async getAllUser() {
    return this.authService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  @Serialize(UserDto)
  async getUserId(@Param('id') id: string, @User() user: UserEntity) {
    return this.authService.getUserId(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string, @User() user: UserEntity) {
    return this.authService.deleteUserById(id, user);
  }
}
