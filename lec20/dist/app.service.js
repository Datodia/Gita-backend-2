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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const email_sender_service_1 = require("./email-sender/email-sender.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppService = class AppService {
    emailSenderService;
    userModel;
    constructor(emailSenderService, userModel) {
        this.emailSenderService = emailSenderService;
        this.userModel = userModel;
    }
    data = {
        en: {
            title: "Hello world"
        },
        ka: {
            title: 'გამარჯობა სამყარო'
        }
    };
    getHello(lang) {
        return this.data[lang]?.title;
    }
    async sendEmailtoSomeone({ subject, text }) {
        const emails = [
            'dato.diasamidze.02@gmail.com',
            'nika@gmail.com',
            'test@gmail.com',
            'lasha.2017.muzashvili@gmail.com',
            'lasha.2017.muzashvili1@gmail.com',
            'lasha.2017.muzashvil2i@gmail.com',
            'lasha.2017.muzashvili3@gmail.com',
            'lasha.2017.muzashvil4i@gmail.com',
            'lasha.2017.muzashvil5i@gmail.com',
            'lasha.2017.muzashvil6i@gmail.com',
            'lasha.2017.muzashvil7i@gmail.com',
            'lasha.2017.muzashvil8i@gmail.com',
            'lasha.2017.muzashvil9i@gmail.com',
            'lasha.2017.muzashvil9i@gmail.com',
            'lasha.2017.muzashvil11i@gmail.com',
            'lasha.2017.muzashvil911i@gmail.com',
            'lasha.2017.muzashvil911i@gmail.com',
            'lasha.2017.muzashvil911i@gmail.com',
            'lasha.2017.muzashvil119i@gmail.com',
            'lasha.2017.muzashvil119i@gmail.com',
            'lasha.2017.muzashvil119i@gmail.com',
            'lasha.2017.muzashvil11asd19i@gmail.com',
            'lasha.2017.muzashvil11asd19i@gmail.com',
            'lasha.2017.muzashvil11asd19i@gmail.com',
            'lasha.2017.muzashvil11asd19i@gmail.com',
            'lasha.2017.muzashvil1asd119i@gmail.com',
        ];
        await this.emailSenderService.sendWelcomeTextToNewUsersBCC(emails);
        return 'sent successfully';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [email_sender_service_1.EmailSenderService,
        mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map