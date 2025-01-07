import { Body, Controller, Post, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('tasks')
export class AuthController{
    constructor(private authservice: AuthService){}
    @Get('first')
    createTask(@Body() dto: AuthDto){
        return this.authservice.createTask(dto)
    }
}