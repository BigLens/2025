import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/customDeco';
import { User } from '@prisma/client';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':id')
    async getUser(@Param('id') userId: number): Promise<Partial<User>>{
        const getTheUser = await this.userService.getUser(userId)
        const {hash, ...noHash} = getTheUser;
        return noHash;

    }
}
