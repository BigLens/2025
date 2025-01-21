import { Module } from "@nestjs/common";
import { RegisterController } from "./register.controller";
import { AuthRegister } from "./auth.register";

@Module({
    controllers: [RegisterController],
    providers: [AuthRegister]
})
export class RegisterModule{}