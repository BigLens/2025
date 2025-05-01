import { UserEntity } from '../model/auth.entity';

export class AuthResponseDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    this.id = partial.id;
    this.email = partial.email;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
  }
}
