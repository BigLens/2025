import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController{
    constructor(private authservice: AuthService){}
    @Post()
    createTask(){
        return ''
    }
}