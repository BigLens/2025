import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService){}
  async signup(dto: AuthDto) {
    if(!dto.email || dto.email.trim() === ''){
      throw new ForbiddenException('email cannot be empty')
    }
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

  async signin(dto: AuthDto){
    //verify user
    const verifyUserSignin = await this.prisma.user.findUnique({
      where: {email: dto.email}
    })
    if(!verifyUserSignin){
      throw new ForbiddenException('user not found')
    }
    //check password
    const pswd = await argon.verify(verifyUserSignin.hash, dto.password);
    if(!pswd){
      throw new ForbiddenException('invalid password')
    }
  }
}
