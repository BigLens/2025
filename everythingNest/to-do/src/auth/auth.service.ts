import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from '../dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}
  async signUp(dto: AuthDto) {
   try {
    //create a password
    const hash = await argon.hash(dto.password)
    //create a user
    const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        hash,
      }
    })
    return user
    
   } catch (error) {
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2002'){
        throw new ForbiddenException('credential not available')
      }
    }
    throw error;
   }
  }
}
