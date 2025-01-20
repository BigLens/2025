import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authservice.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
}
