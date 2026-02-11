"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdminMiddleware = IsAdminMiddleware;
const common_1 = require("@nestjs/common");
function IsAdminMiddleware(roles) {
    return (req, res, next) => {
        if (!req.headers['role'] ||
            !roles.includes(req.headers['role']))
            throw new common_1.UnauthorizedException('Perminito denied');
        next();
    };
}
//# sourceMappingURL=is-admin.middleware.js.map