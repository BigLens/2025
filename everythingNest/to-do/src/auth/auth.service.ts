import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService
  ){}
  async signup(dto: AuthDto) {
    
    if(!dto.email || dto.email.trim() === ''){
      throw new ForbiddenException('email cannot be empty')
    }
    if(!dto.password || dto.password.trim() === ''){
      throw new ForbiddenException('password cannot be empty')
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

  async signin(dto: AuthDto): Promise<{access_token: string}>{
    const verifyUserSignin = await this.prisma.user.findUnique({
      where: {email: dto.email}
    })
    if(!verifyUserSignin){
      throw new ForbiddenException('user not found')
    }
    const pswd = await argon.verify(verifyUserSignin.hash, dto.password);
    if(!pswd){
      throw new ForbiddenException('invalid password')
    }
    const theToken = await this.userToken(verifyUserSignin.id.toString(), verifyUserSignin.email)

    return theToken;
  }

  async userToken(userId: string, email: string): Promise<{access_token: string}>{
    const payload = {sub: userId, email};
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "1hr",
      secret: this.config.get("JWT-SECRET")
    })
    return { access_token: token}
}
}
