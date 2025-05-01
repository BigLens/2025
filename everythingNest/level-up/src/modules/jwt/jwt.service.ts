import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtToken {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async token(id: string, email: string): Promise<{ access_token: string }> {
    const payload = { id, email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1hr',
      secret: this.config.get('JWT_SECRET'),
    });
    return { access_token: token };
  }
}
