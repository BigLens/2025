import { Body, Controller, Post } from "@nestjs/common";
import { AuthRegister } from "./auth.register";

@Controller('register')
export class RegisterController{
    constructor(private authregister: AuthRegister){}

    @Post('user')
    register(@Body() body: {email: string, password, string}){
        return this.authregister.register(body.email, body.password)
    }
}