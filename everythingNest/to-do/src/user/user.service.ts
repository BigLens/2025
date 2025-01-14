import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async getUser(userId: number){
        const id = Number(userId)
        return await this.prisma.user.findUnique({
            where: {id}, 
        })
    }
}
