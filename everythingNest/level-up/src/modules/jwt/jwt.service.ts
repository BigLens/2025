import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '@modules/auth/model/auth.entity';

@Injectable()
export class JwtToken {
  constructor(private jwt: JwtService) {}

  async token(user: UserEntity): Promise<{ access_token: string }> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload);
    return { access_token: token };
  }
}
