import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Call the default guard logic
        const result = (await super.canActivate(context)) as boolean;
    
        // Add additional logic if needed (e.g., logging or permissions)
        return result;
}
}