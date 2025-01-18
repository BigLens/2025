import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/customDeco';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/guard';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUser(@Param('id') userId: number): Promise<Partial<User>>{
        const getTheUser = await this.userService.getUser(userId)
        const {hash, ...noHash} = getTheUser;
        return noHash;

    }
}