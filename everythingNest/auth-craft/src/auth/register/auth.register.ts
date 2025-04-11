import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { userMock } from "../mock-file";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRegister{
    constructor(private config: ConfigService, private jwt: JwtService){}

    async register(email: string, password: string){
        //check if user exist
        const checkIfUserExist =  userMock.find(user => user.email === email)
        if(checkIfUserExist){
            const payload = {id: checkIfUserExist.id, email: checkIfUserExist.email}
            const token = this.jwt.sign(payload,{
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '1hr'
            })
            return { token };
        }

        //create user if user does not exist
        const user = {id: userMock.length + 1, email, password}
        userMock.push(user)

        //generate a jwt
        const payload = {id: user.id, email: user.email}
        const token = this.jwt.sign(payload,{
            secret: this.config.get('JWT_SECRET'),
            expiresIn: '1hr'
        })
        return {user: user, token}
    }
}