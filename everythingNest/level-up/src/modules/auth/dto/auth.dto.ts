import { IsString } from "class-validator";

export class UserDto {
    id: number
    
    @IsString()
    email: string

    @IsString()
    password: string
}