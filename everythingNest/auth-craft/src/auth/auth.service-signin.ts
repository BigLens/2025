import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { userMock } from "./mock-file";

@Injectable()
export class AuthServiceSignIn{
    constructor(private jwt: JwtService, private config: ConfigService){}

    signIn(email: string, password: string){

        const userExist = userMock.find(user => user.email === email)
        if(!userExist || userExist.password !== password){
            throw new Error('invalid credentials')
        }
        

        // generate a jwt

        const payload = {email: userExist.email, id: userExist.id}
        const token = this.jwt.sign(payload, {
            secret: this.config.get("JWT_SECRET"),
            expiresIn: '1hr'
        })
        
        return {access_token: token}
    }
}