import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto';

@Controller('user')
export class AuthController {
  constructor(private authservice: AuthService) {}
  
  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authservice.signUp(dto);
    
  }
  
}
