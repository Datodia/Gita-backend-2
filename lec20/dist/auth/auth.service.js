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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const email_sender_service_1 = require("../email-sender/email-sender.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    emailSenderService;
    constructor(userModel, jwtService, emailSenderService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailSenderService = emailSenderService;
    }
    async signUp({ age, email, fullName, password }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser)
            throw new common_1.BadRequestException('User already exists');
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const otpCode = Math.random().toString().slice(2, 8);
        const optCodeExpirationDate = new Date().setTime(new Date().getTime() + 3 * 60 * 1000);
        await this.userModel.create({
            email,
            fullName,
            age,
            password: hashedPassword,
            OTPCode: otpCode,
            OTPCodeExpirationDate: optCodeExpirationDate,
        });
        await this.emailSenderService.sendOTPCode(email, otpCode);
        return 'Check email for verify';
    }
    async resendVerificationCode({ email }) {
        const existUser = await this.userModel.findOne({ email });
        if (!existUser)
            throw new common_1.BadRequestException('User Not found');
        if (existUser.isVerfied)
            throw new common_1.BadRequestException('You already verified');
        if (new Date().getTime() < Number(existUser.OTPCodeExpirationDate))
            throw new common_1.BadRequestException('OTP code is not outdated');
        const otpCode = Math.random().toString().slice(2, 8);
        const optCodeExpirationDate = new Date().setTime(new Date().getTime() + 3 * 60 * 1000);
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: otpCode,
            OTPCodeExpirationDate: optCodeExpirationDate,
        });
        await this.emailSenderService.sendOTPCode(email, otpCode);
        return 'check email for verify';
    }
    async verifyUser({ email, otpCode }) {
        const existUser = await this.userModel.findOne({ email });
        if (!existUser)
            throw new common_1.BadRequestException('User Not found');
        if (otpCode !== existUser.OTPCode)
            throw new common_1.BadRequestException('Wrong OTP code');
        if (new Date().getTime() > Number(existUser.OTPCodeExpirationDate))
            throw new common_1.BadRequestException('OTP code outdated');
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: null,
            OTPCodeExpirationDate: null,
            isVerfied: true,
        });
        const payload = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token };
    }
    async signIn({ email, password }) {
        const existUser = await this.userModel
            .findOne({ email })
            .select('+password');
        if (!existUser)
            throw new common_1.BadRequestException('Invalid Credentials');
        if (!existUser.isVerfied)
            throw new common_1.BadRequestException('Verify User');
        const isPassEqual = await bcrypt_1.default.compare(password, existUser.password);
        if (!isPassEqual)
            throw new common_1.BadRequestException('Invalid Credentials');
        const payload = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token };
    }
    async signInWithGoogle(user) {
        let existUser = await this.userModel.findOne({ email: user.email });
        if (!existUser) {
            existUser = await this.userModel.create({
                fullName: user.fullName,
                email: user.email,
            });
        }
        existUser.profilePic = user.profilePic,
            existUser.isVerfied = true;
        await existUser.save();
        const payload = {
            userId: existUser._id,
        };
        const token = await this.jwtService.sign(payload, { expiresIn: '1h' });
        const redirectUrl = process.env.FRONT_URL;
        return { token, redirectUrl };
    }
    async currentUser(userId) {
        const user = await this.userModel.findById(userId);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_sender_service_1.EmailSenderService])
], AuthService);
//# sourceMappingURL=auth.service.js.map