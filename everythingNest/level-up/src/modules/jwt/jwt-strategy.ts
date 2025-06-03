import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/auth/model/auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const { id, email } = payload;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.email !== email) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
