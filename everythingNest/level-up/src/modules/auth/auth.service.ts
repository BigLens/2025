import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/auth/model/auth.entity';
import { CreateUserDto } from '@modules/auth/dto/crate-user.dto';
import * as argon2 from 'argon2';
import { JwtToken } from '@modules/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtToken: JwtToken,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);
    const create = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
    });
    const holder = await this.userRepo.save(create);

    return holder;
  }

  async login(
    dto: CreateUserDto,
  ): Promise<{ user: Partial<UserEntity>; access_token: string }> {
    const user = await this.userRepo.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await argon2.verify(user.password, dto.password);
    if (!passwordMatch) {
      throw new NotFoundException('Incorrect password');
    }
    const Token = await this.jwtToken.token(user);
    return { user, access_token: Token.access_token };
  }

  async getAllUser() {
    const users = await this.userRepo.find();

    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getUserId(id: string, requestingUser: UserEntity) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== requestingUser.id) {
      throw new ForbiddenException(
        "You do not have permission to access this user's data",
      );
    }
    return user;
  }

  async deleteUserById(id: string, requestingUser: UserEntity) {
    const user = await this.userRepo.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== requestingUser.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this account',
      );
    }

    try {
      const result = await this.userRepo.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException('Failed to delete user');
      }
      return { message: 'User successfully deleted' };
    } catch (error) {
      throw new NotFoundException('Failed to delete user');
    }
  }
}
