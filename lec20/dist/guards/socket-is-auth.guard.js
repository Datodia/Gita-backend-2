"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let SocketIsAuthGuard = class SocketIsAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToWs().getClient().handshake.auth;
        const authorization = req['authorization'];
        if (!authorization)
            throw new common_1.UnauthorizedException('permition denied');
        const [type, token] = authorization.split(' ');
        if (!token)
            throw new common_1.UnauthorizedException('permition denied');
        try {
            const payload = this.jwtService.verify(token);
            req['userId'] = payload.userId;
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('permition denied');
        }
    }
};
exports.SocketIsAuthGuard = SocketIsAuthGuard;
exports.SocketIsAuthGuard = SocketIsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SocketIsAuthGuard);
//# sourceMappingURL=socket-is-auth.guard.js.map