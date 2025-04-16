import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/auth/model/auth.entity';
import { UserDto } from '@modules/auth/dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtToken } from '@modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtToken: JwtToken
  ) {}

  async createUser(dto: UserDto): Promise<Partial<UserEntity>> {
    //check if user exist
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new ConflictException('user already exist');
    }

    const hashedPassword = await argon2.hash(dto.password);
    const create = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
    });
    const holder = await this.userRepo.save(create);

    const {password, ...withoutPassword} = holder;
    return withoutPassword;
  }

  async login(dto: UserDto): Promise<{access_token:string}>{
    //check if user exist
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      }
    })
    if(!user) {
      throw new NotFoundException('user not found')
    }

    //check if password match
    const passwordMatch = await argon2.verify(user.password, dto.password)
    if (!passwordMatch) {
      throw new NotFoundException('incorrect password');
    }
    const Token = await this.jwtToken.token(dto.id, dto.email);
    return Token;
  }
}
