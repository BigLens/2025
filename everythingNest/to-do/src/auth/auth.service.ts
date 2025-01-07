import { AuthDto } from "./dto";

export class AuthService{
      createTask(dto: AuthDto){
        return {msg: 'task created'}
      }  
}