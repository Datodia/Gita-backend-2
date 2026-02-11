"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAgentMiddleware = void 0;
class GetUserAgentMiddleware {
    use(req, res, next) {
        console.log(req.headers['user-agent']);
        next();
    }
}
exports.GetUserAgentMiddleware = GetUserAgentMiddleware;
//# sourceMappingURL=get-user-agent.middlewate.js.map