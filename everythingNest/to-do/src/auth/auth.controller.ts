import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller()
export class AuthController{
    constructor(private authservice: AuthService){}
    @Post()
    createTask(@Body() dto: AuthDto){
        return this.authservice.createTask(dto)
    }
}