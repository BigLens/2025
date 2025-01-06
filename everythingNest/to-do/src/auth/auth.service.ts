import { Body } from "@nestjs/common";
import { AuthDto } from "./dto";

export class AuthService{
      createTask(@Body() dto: AuthDto){
        return 'task created'
      }  
}