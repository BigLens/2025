import { Body, Controller, Post } from '@nestjs/common';
import { AuthServiceSignUp } from './auth.service-signup';
import { AuthServiceSignIn } from './auth.service-signin';

@Controller('auth')
export class AuthController {
    constructor(private authsignUp: AuthServiceSignUp, private authsignIn: AuthServiceSignIn){}

    @Post('signup')
    signup(@Body() body: {email: string, password: string}){
        return this.authsignUp.signUp(body.email, body.password)
    }

    @Post('signin')
    signin(@Body() body: {email: string, password: string}){
        return this.authsignIn.signIn(body.email, body.password)
    }
}
