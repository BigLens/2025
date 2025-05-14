import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassSerializerInterceptor {
    new (...args: any[])
}
export function Serialize(dto: ClassSerializerInterceptor) {
    return UseInterceptors(new SerializationInterceptor(dto))
}
export class SerializationInterceptor implements NestInterceptor {
    constructor(private readonly dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
    }
}