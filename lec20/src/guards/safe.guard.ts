import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class SafeGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest()

        if(!req.headers['api-key'] || Number(req.headers['api-key']) !== 1234) {
            throw new UnauthorizedException('wrong api-key provided')
        }

        return true
    }
}
