import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Global()
@Module({
    controllers: [UserController]
})
export class UserModule {}
