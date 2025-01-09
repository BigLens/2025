import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}
  async signup(dto: AuthDto) {
    const checkIfUserExist = await this.prisma.user.findUnique({
      where: {email: dto.email}
    })
    if(checkIfUserExist){
      throw new ForbiddenException('the details is not available for use, choose another!')
    }
    
   try {
    const hash = await argon.hash(dto.password)
    const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        hash,
      }
    })
    const {hash: _hash, ...removeHash} = user;
    return removeHash;
    
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
