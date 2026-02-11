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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const is_auth_guard_1 = require("../guards/is-auth.guard");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const swagger_1 = require("@nestjs/swagger");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const resend_verification_code_dto_1 = require("./dto/resend-verification-code.dto");
const google_guard_1 = require("../guards/google.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    signInWithGoogle() { }
    async googleAuthCallback(req, res) {
        const { token, redirectUrl } = await this.authService.signInWithGoogle(req.user);
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.redirect(redirectUrl);
    }
    verifyUser(verifyUserDto) {
        return this.authService.verifyUser(verifyUserDto);
    }
    resendVerifyCode(resendVerificationCodeDto) {
        return this.authService.resendVerificationCode(resendVerificationCodeDto);
    }
    signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    currentUser(userId) {
        return this.authService.currentUser(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, swagger_1.ApiBadRequestResponse)({
        example: {
            message: 'User already exists',
            error: 'Bad Request',
            statusCode: 400,
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({ example: 'User created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_guard_1.GoogleOauthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInWithGoogle", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('verify-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.VerifyUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Post)('resend-verification-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_verification_code_dto_1.ResendVerificationCodeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendVerifyCode", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiBadRequestResponse)({
        example: {
            message: 'Invalid Credentials',
            error: 'Bad Request',
            statusCode: 400,
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        example: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQyZDc2YTFkYjBiZjhhM2QxM2I5ZWEiLCJpYXQiOjE3NjU5ODg1MjcsImV4cCI6MTc2NTk5MjEyN30.KVpRTK-O2Laawhwt-TSMoWJzXR-kw0CPkRTC8jOW6u4',
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('current-user'),
    (0, common_1.UseGuards)(is_auth_guard_1.IsAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({
        example: {
            message: 'permition denied',
            error: 'Unauthorized',
            statusCode: 401,
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        example: {
            _id: '6942d76a1db0bf8a3d13b9ea',
            fullName: 'John Doe',
            email: 'John@gmail.com',
            age: 22,
            expenses: [],
            role: 'viewer',
            createdAt: '2025-12-17T16:16:42.566Z',
            updatedAt: '2025-12-17T16:16:42.566Z',
            __v: 0,
        },
    }),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "currentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map