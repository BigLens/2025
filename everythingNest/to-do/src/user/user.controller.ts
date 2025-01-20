import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') userId: number): Promise<Partial<User>>{
        const getTheUser = await this.userService.getUser(userId)
        const {hash, ...noHash} = getTheUser;
        return noHash;

    }
}