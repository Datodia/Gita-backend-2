import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class RoleGuard implements CanActivate{
    private roles: string[] = []
    constructor(...roles: string[]){
        this.roles = roles
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>()
        const roleFromHeader: string = req.headers['role'] as string
        if(!roleFromHeader || !this.roles.includes(roleFromHeader)) return false


        req['role'] = roleFromHeader.toUpperCase()
        return true
    }
}