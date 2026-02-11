"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
function loggerMiddleware(req, res, next) {
    console.log('logger middleware ', req.url, req.method);
    next();
}
//# sourceMappingURL=logger.middleware.js.map