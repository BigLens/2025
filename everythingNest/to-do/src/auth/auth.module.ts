import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

export class AuthModule{
    controllers: [AuthController]
    providers: [AuthService]
}