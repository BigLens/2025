import { Module } from '@nestjs/common';
import { AuthServiceSignUp } from './auth.service-signup';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceSignIn } from './auth.service-signin';
import { AuthRegister } from './register/auth.register';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [ConfigModule, RegisterModule,JwtModule.register({
    global: true
  })],
  providers: [AuthServiceSignUp, AuthServiceSignIn, AuthRegister],
  controllers: [AuthController, AuthController]
})
export class AuthModule {}
