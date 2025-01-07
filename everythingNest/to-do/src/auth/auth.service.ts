import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from '../dto';
import { Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}
  async createTask(dto: AuthDto) {
   try {
    //create a user
    const user = await this.prisma.user.create({
      data:{
        email: dto.email,
      }
    })
    
   } catch (error) {
    
   }
  }
}
