import { IsString } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class UserDto {
    id: number
    
    @IsString()
    email: string

    @IsString()
    password: string
}