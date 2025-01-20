import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({
    global: true,
    //secret: process.env.JWT_SECRET,
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy]
})
export class AuthModule {}
