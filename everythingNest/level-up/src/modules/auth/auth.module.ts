import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtToken } from '@modules/jwt/jwt.service';
import { JwtStrategy } from '@modules/jwt/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtToken, JwtStrategy],
})
export class AuthModule {}
